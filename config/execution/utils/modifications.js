const MODIFICATIONS = [
  { title: 'Микросервис (старый каркас)', value: 'rus' },
  { title: 'Микросервис (новый каркас)', value: 'euro' },
  { title: 'Shared конфигурация', value: 'shared' },
  { title: 'Pure конфигурация', value: 'pure' },
];

const getModificationTitles = () => MODIFICATIONS.map(({ title }) => title);

const getModificationValueByTitle = title =>
  MODIFICATIONS.find(modification => modification.title === title).value;

module.exports = {
  getModificationTitles,
  getModificationValueByTitle,
};
