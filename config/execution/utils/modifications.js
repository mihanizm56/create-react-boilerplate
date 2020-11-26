const MODIFICATIONS = [
  { title: 'Микросервис (Старый каркас)', value: 'rus' },
  { title: 'Микросервис (Новый каркас)', value: 'euro' },
  { title: 'Shared конфигурация (Монолит)', value: 'shared' },
  { title: 'Gatsby конфигурация (Новый каркас)', value: 'gatsby' },
  { title: 'Pure конфигурация', value: 'pure' },
];

const getModificationTitles = () => MODIFICATIONS.map(({ title }) => title);

const getModificationValueByTitle = title =>
  MODIFICATIONS.find(modification => modification.title === title).value;

module.exports = {
  getModificationTitles,
  getModificationValueByTitle,
};
