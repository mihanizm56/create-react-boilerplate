const { Listr } = require('listr2');

const delay = ms =>
  new Promise(res => {
    setTimeout(() => {
      res();
    }, ms);
  });

const main = async () => {
  const tasks = new Listr([
    {
      title: 'This task will execute.',
      task: async (_, task) => {
        task.stdout();
        console.log('I will push an output. [0]');
        await delay(1000);

        console.log('I will push an output. [1]');
        await delay(1000);

        console.log('I will push an output. [2]');
        await delay(1000);
      },
      options: { persistentOutput: true },
    },
  ]);

  await tasks.run();
};

main();
