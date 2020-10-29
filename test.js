const path = require('path');
const { Listr } = require('listr2');
const { access } = require('./config/execution/utils/fs-promises');

const pathToExecute = process.cwd();

let isGitExist = false;

const checkGitDir = async () => {
  try {
    await access(path.join(pathToExecute, '.git'));
    isGitExist = true;
  } catch {}
};

const main = () => {
  const tasks = new Listr([
    {
      title: 'Test',
      task: async (_, task) => {
        await checkGitDir(task);
      },
      options: { persistentOutput: true },
    },
    {
      title: 'Test after',
      task: async (_, task) => {
        task.output = `${isGitExist}`;
      },
      options: { persistentOutput: true },
    },
  ]);

  tasks.run();
};

main();
