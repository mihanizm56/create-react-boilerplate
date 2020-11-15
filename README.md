[![Tested with TestCafe](https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg)](https://github.com/DevExpress/testcafe)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Wildberries Boilerplate 2.0

# Основные замечания
 - Фрактальная архитектура проекта
 - Typescipt/pure js
 - Router 5
 - CRA v3 & rewired
 - Express/Nginx (http2+server_push) сервер статики
 - Redux-ducks/Databus/Graphql стейт-менеджеры
 - Microservice/Monolith поддерживаемые архитектуры
 - install & healthcheck при уставовки
 - параллельный анимированный запуск прекоммит проверок
 - Commitizen+Commitlint
 - Express для мок-сервера

## Приготовлеие
```sh
$ npm run setup
``` 

## Запуск
```sh
$ npm run wb
``` 

# Структура проекта
```
├── README.md - Документация
├── build – Результат сборки
├── cli – CLI бойлерплейта
├── config – Конфигурации бойлерплейта
├── public – Статика доступная из корня после сборки
├── server – Мок-сервер бойлерплейта и сервер статики (в зависимости от модифицикации)
├── src
│   ├── _assets – Папка с ассетами (может распологаться на любом уровне вложенности)
│   ├── _databus – Мапка с модулями Databus (может распологаться на любом уровне вложенности)
│   │   └── databus модули...
│   │       ├── action-creators - сайд эффекты проекта (like redux-thunk)
│   │       ├── selectors - селекторы Databus
│   │       │   ├── selectors.ts - селекторы чистого Databus
│   │       │   └── subscriber-selectors.ts - селекторы React-адаптера Subscriber (@ravilm/databus-react) (like redux)
│   │       |
│   │       ├── actions.ts - actions Databus (like redux)
│   │       ├── events.ts - events Databus (like redux)
│   │       └── listeners.ts - listeners Databus (like redux)
│   │
│   ├── _redux – Папка с модулями redux (может распологаться на любом уровне вложенности)
│   │   └── redux-ducks модули...
│   │
│   ├── _constants – Константы (может распологаться на любом уровне вложенности) (может быть как файлом так и папкой)
│   ├── _utils – Утилиты основного уровня проекта (может распологаться на любом уровне вложенности)
│   ├── _types – Типы (может распологаться на любом уровне вложенности) (может быть как файлом так и папкой)
│   ├── _components – React компоненты (может распологаться на любом уровне вложенности)
│   ├── _layouts – Шаблоны для страниц (может распологаться на любом уровне вложенности)
│   ├── api – Папка с запросами
│   ├── pages – Точка входа роутинга проекта
|   |   ├── store-inject-config – Настройки для запросов за данными при заходе на страницу роутинга
│   │   └── pages модули...
│   |
│   ├── index.tsx – Точка входа проекта
│   ├── react-app-env.d.ts – Глобальные типы проекта
│   └── ... Манифесты настроек проекта
│
├── utils – Утилиты верхнего уровня проекта (не путать с _utils)
└── ... манифесты настроек проекта
```