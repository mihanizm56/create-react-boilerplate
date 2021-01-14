const MODIFICATIONS = [
  { title: 'Микросервис (Старый каркас)', value: 'rus' },
  { title: 'Микросервис (Новый каркас)', value: 'euro' },
  { title: 'Shared конфигурация (Монолит)', value: 'shared' },
  { title: 'Gatsby конфигурация (Новый каркас)', value: 'gatsby' },
  { title: 'Graphql конфигурация (Чистая конфигурация)', value: 'graphql' },
  { title: 'Pure конфигурация', value: 'pure' },
  { title: 'Server-side-rendering конфигурация', value: 'ssr' },
];

const getModificationTitles = () => MODIFICATIONS.map(({ title }) => title);

const getModificationValueByTitle = title =>
  MODIFICATIONS.find(modification => modification.title === title).value;

module.exports = {
  getModificationTitles,
  getModificationValueByTitle,
};
