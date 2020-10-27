#!/usr/bin/env node

/* eslint-disable no-console */
// eslint-disable-next-line
const colors = require('colors');
const username = require('os').userInfo().username;
const path = require('path');
const { Listr } = require('listr2');
const Copier = require('@mihanizm56/node-file-copier');
const { remove } = require('fs-extra');
const { Select } = require('enquirer');
const { isWindows } = require('./is-windows');
const { exec, access, rename } = require('./fs-promises');
const { getExecutionPaths } = require('./execution-paths');
const { getArrayOfCopiedFiles } = require('./get-array-of-copied-files');

class ExecutionRunner {
  constructor() {
    this.areNPMDirsExist = true;
    this.areGitDirsExist = true;
    this.isWindows = isWindows();
  }

  async init() {
    await this.startExecution();
  }

  async cleaningUpCode() {
    await exec(
      'npx eslint -c config/linters/.eslintrc.js src/ --ext .ts,.js,.tsx --fix && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}" --config config/linters/.stylelintrc.js',
    );
  }

  // async runCliExecutorOnly() {
  //   if (!this.areNPMDirsExist) {
  //     return;
  //   }
  //   process.chdir(this.pathToExecute);
  //   await exec(`npx ${this.getPackageCLIInstallCommand()}`);
  //   if (!this.flags.euro) {
  //     await exec('npx npm-force-resolutions');
  //   }
  //   await exec('npm install');
  //   this.cleaningUpCode();
  // }

  // async runConfigExecutorOnly() {
  //   if (!this.areNPMDirsExist) {
  //     return;
  //   }
  //   process.chdir(this.pathToExecute);
  //   await exec(`npx ${this.getPackageConfigInstallCommand()}`);
  //   if (!this.flags.euro) {
  //     await exec('npx npm-force-resolutions');
  //   }
  //   await exec('npm install');
  //   this.cleaningUpCode();
  // }

  startTimer = () => process.hrtime();

  finishTimer = hrstart => {
    const hrend = process.hrtime(hrstart);

    const mins = Math.floor(hrend[0] / 60);
    const seconds = hrend[0] - mins * 60;

    console.log('');
    console.log(`installation time: ${mins}m ${seconds}s`.green);
    console.log('');
  };

  async checkNPMDirs() {
    try {
      await access(path.join(this.rootDir, 'package.json'));
      await access(path.join(this.rootDir, 'package-lock.json'));
      await access(path.join(this.rootDir, 'node_modules'));
    } catch {
      this.areNPMDirsExist = false;
      await exec('npm init -y');
    }
  }

  async checkGitDir() {
    try {
      await access(path.join(this.pathToExecute, '.git'));
    } catch {
      this.areGitDirsExist = false;
      await exec('git init');
    }
  }

  async renameNpmFiles() {
    const gitignoreOldFilePath = path.join(
      this.projectFolder,
      '.gitignore-prepare',
    );
    const gitignoreNewFilePath = path.join(this.projectFolder, '.gitignore');

    await rename(gitignoreOldFilePath, gitignoreNewFilePath);
  }

  getPackageConfigInstallCommand() {
    return `@wildberries/boilerplate-config-packager --${this.modification}`;
  }

  getPackageCLIInstallCommand() {
    return `@wildberries/boilerplate-cli-packager --${this.modification}`;
  }

  async setupRoots() {
    if (this.isWindows) {
      await exec(
        'find ./config -name "*.*" | xargs git update-index --chmod=+x',
      );
    } else {
      await exec(`chown -R ${username} ./config`);
    }
  }

  async uninstallInitialPackages() {
    await exec('npm uninstall @wildberries/create-react-boilerplate');
    await exec('npm uninstall @wildberries/create-react-boilerplate -g');
    await exec('npm uninstall @wildberries/boilerplate-config-packager -g ');
    await exec('npm uninstall @wildberries/boilerplate-cli-packager -g ');
  }

  async startExecution() {
    const timestampStart = this.startTimer();

    try {
      const cliRunner = this.getConfiguredCliRunner();

      await cliRunner.run();

      this.finishTimer(timestampStart);
      console.log('Happy coding =)'.green);
    } catch (error) {
      console.error(
        'error when executing the package',
        error.stdout || error.message,
      );
    }
  }

  getConfiguredCliRunner() {
    return new Listr(
      [
        {
          title: 'Asking questions',
          task: () => {},
        },
        {
          task: async () => {
            const prompt = new Select({
              name: 'Choose the boilerplate modification',
              message: 'Choose boilerplate modification',
              choices: ['rus', 'euro', 'shared', 'pure'],
            });

            const modification = await prompt.run();
            this.modification = modification;
          },
        },
        {
          task: async (ctx, task) => {
            const inputPath = await task.prompt({
              type: 'Input',
              message: 'Choose path to execute the boilerplate',
            });

            if (!inputPath) {
              throw new Error('please, choose the execution path');
            }

            const { pathToExecute, projectFolder, rootDir } = getExecutionPaths(
              inputPath,
            );

            const arrayOfFilesToCopy = getArrayOfCopiedFiles({
              projectFolder,
              pathToExecute,
            });

            this.rootDir = rootDir;
            this.pathToExecute = pathToExecute;
            this.arrayToCopy = arrayOfFilesToCopy;
            this.projectFolder = projectFolder;
          },
        },
        {
          title: 'Prepare directory',
          task: (ctx, task) =>
            task.newListr([
              {
                title: 'Git setup',
                task: async () => {
                  await this.checkGitDir();
                },
              },
              {
                title: 'Npm setup',
                task: async () => {
                  await this.checkNPMDirs();
                  await this.uninstallInitialPackages();
                },
              },
            ]),
        },
        {
          title: 'Install boilerplate packages',
          task: (ctx, task) =>
            task.newListr([
              {
                title: 'Main packager',
                task: async () => {
                  await exec(
                    'npm install @wildberries/create-react-boilerplate',
                  );
                  await this.renameNpmFiles();
                  await new Copier({
                    arrayToCopy: this.arrayToCopy,
                  }).activate();
                  await exec(
                    'npm uninstall @wildberries/create-react-boilerplate',
                  );
                  await process.chdir(this.pathToExecute);
                },
              },
              {
                title: 'Config packager',
                task: async () => {
                  await exec(`npx ${this.getPackageConfigInstallCommand()}`);
                },
              },
              {
                title: 'CLI packager',
                task: async () => {
                  await exec(`npx ${this.getPackageCLIInstallCommand()}`);
                },
              },
            ]),
        },
        {
          title: 'Prepare final configutions',
          task: (ctx, task) =>
            task.newListr([
              {
                title: 'Repair package-lock.json',
                task: async () => {
                  await exec('npx npm-force-resolutions');
                },
              },
              {
                title: 'Add all files to git',
                task: async () => {
                  await exec('git add .');
                },
              },
              {
                title: 'Husky setup',
                task: async () => {
                  await exec('npx husky');
                },
              },
              {
                title: 'Roots setup',
                task: async () => {
                  await this.setupRoots();
                },
              },
              {
                title: 'Npm install',
                task: async () => {
                  await exec('npm install');

                  if (
                    this.pathToExecute !== this.rootDir &&
                    !this.areNPMDirsExist
                  ) {
                    await remove(path.join(this.rootDir, 'package.json'));
                    await remove(path.join(this.rootDir, 'package-lock.json'));
                    await remove(path.join(this.rootDir, 'node_modules'));
                  }
                },
              },
            ]),
        },
        {
          title: 'Full project check',
          task: async () => {
            await exec(
              'node ./cli/_utils/ci-utils/executor.js --command=check-full-system',
            );
          },
        },
      ],
      {
        rendererOptions: { collapse: false },
      },
    );
  }
}

module.exports.ExecutionRunner = ExecutionRunner;
