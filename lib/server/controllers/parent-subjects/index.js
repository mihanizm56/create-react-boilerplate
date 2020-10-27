const { devServerLog } = require('../../../utils/dev-server-logger');
const { parentSubjectsData } = require('./data');

const parentSubjectsController = (req, res) => {
  devServerLog('info', 'parentSubjectsController get request');

  setTimeout(() => {
    res.status(200).json({
      error: false,
      errorText: '',
      data: parentSubjectsData,
    });
  }, 100);
};

module.exports = {
  parentSubjectsController,
};
