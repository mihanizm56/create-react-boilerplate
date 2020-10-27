// eslint-disable-next-line
const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api/v1',
    proxy({
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    }),
  );
};
