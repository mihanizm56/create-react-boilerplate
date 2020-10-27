const { devServerLog } = require('../../../utils/dev-server-logger');
const { topRatedProductsData } = require('./data');

const topRatedProductsController = (req, res) => {
  devServerLog('info', 'topRatedProductsController get request');

  setTimeout(() => {
    res.status(200).json({
      error: false,
      errorText: '',
      data: { products: topRatedProductsData },
      additionalErrors: null,
    });
  }, 1000);
};

module.exports = {
  topRatedProductsController,
};
