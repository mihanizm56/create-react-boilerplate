#!/usr/bin/env node

/* eslint-disable no-console */
// eslint-disable-next-line
const colors = require('colors');
const username = require('os').userInfo().username;
const path = require('path');
const { spawnSync } = require('child_process');
const { Listr } = require('listr2');
const Copier = require('@mihanizm56/node-file-copier');
const { remove } = require('fs-extra');
const { Select } = require('enquirer');
const { isWindows } = require('./is-windows');
const { exec, access, rename } = require('./fs-promises');
const { getExecutionPaths } = require('./execution-paths');
const { getArrayOfCopiedFiles } = require('./get-array-of-copied-files');
const {
  getModificationTitles,
  getModificationValueByTitle,
} = require('./modifications');
const {
  replaceEmptyPackageJsonFields,
} = require('./replace-empty-package-json-fields');

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
    const modificationValue = getModificationValueByTitle(
      this.modificationTitle,
    );

    return `@wildberries/boilerplate-config-packager --${modificationValue}`;
  }

  getPackageCLIInstallCommand() {
    const modificationValue = getModificationValueByTitle(
      this.modificationTitle,
    );

    return `@wildberries/boilerplate-cli-packager --${modificationValue}`;
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
      await process.chdir(this.pathToExecute);

      spawnSync('node', ['cli/_utils/ci-utils/precommit-runner/runner.js'], {
        stdio: 'inherit',
        shell: true,
        windowsHide: true,
      });

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
          title: 'Ввод необходимых значений',
          task: () => {},
        },
        {
          task: async () => {
            const modificationTitles = getModificationTitles();

            const prompt = new Select({
              message: 'Выберите модификацию бойлерплейта',
              choices: modificationTitles,
            });

            const modificationTitle = await prompt.run();
            this.modificationTitle = modificationTitle;
          },
        },
        {
          task: async (ctx, task) => {
            const inputPath = await task.prompt({
              type: 'Input',
              message:
                'Введите относительный путь до директории где будет произведена распаковка',
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
          title: 'Подготовка исходной директории',
          task: (ctx, task) =>
            task.newListr([
              {
                title: 'Очистка кэша npm',
                task: async () => {
                  await exec('npm cache clean -f');
                },
              },
              {
                title: 'Подготовка npm исходной директории',
                task: async () => {
                  await this.checkNPMDirs();
                  await this.uninstallInitialPackages();
                },
              },
            ]),
        },
        {
          title: 'Установка модулей бойлерплейта',
          task: (ctx, task) =>
            task.newListr([
              {
                title: 'Main упаковщик',
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
                title: 'Config упаковщик',
                task: async () => {
                  await exec(`npx ${this.getPackageConfigInstallCommand()}`);
                },
              },
              {
                title: 'CLI упаковщик',
                task: async () => {
                  await exec(`npx ${this.getPackageCLIInstallCommand()}`);
                },
              },
            ]),
        },
        {
          title: 'Конфигурирование бойлерплейта',
          task: (ctx, task) =>
            task.newListr([
              {
                title: 'Установка Git',
                task: async () => {
                  await this.checkGitDir();
                },
              },
              {
                title: 'Восстановление package-lock.json',
                task: async () => {
                  await exec('npx npm-force-resolutions');
                },
              },
              {
                title: 'Добавление всех файлов проекта в гит (git add .)',
                task: async () => {
                  await exec('git add .');
                },
              },
              {
                title: 'Установка Husky',
                task: async () => {
                  await exec('npx husky');
                },
              },
              {
                title: 'Установка прав на директории проекта',
                task: async () => {
                  await this.setupRoots();
                },
              },
              {
                title: 'Установка npm зависимостей',
                task: async () => {
                  await replaceEmptyPackageJsonFields();

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
      ],
      {
        rendererOptions: { collapse: false },
      },
    );
  }
}

module.exports.ExecutionRunner = ExecutionRunner;
