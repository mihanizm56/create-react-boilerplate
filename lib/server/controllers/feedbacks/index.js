const { devServerLog } = require('../../../utils/dev-server-logger');
const { averageStatsData } = require('./data');

const feedbacksAverageRateController = (req, res) => {
  devServerLog('info', 'feedbacksAverageRateController get request');

  const averageStatByCathegory =
    averageStatsData[req.query.subjectId].averageRating;

  res.status(200).json({
    error: false,
    errorText: '',
    data: averageStatByCathegory,
  });
};

const feedbacksTopItemsRateController = (req, res) => {
  devServerLog('info', 'feedbacksTopItemsRateController get request');

  const itemByCathegory = averageStatsData[req.query.subjectId].topItems;

  res.status(200).json({
    error: false,
    errorText: '',
    data: itemByCathegory,
  });
};

module.exports = {
  feedbacksAverageRateController,
  feedbacksTopItemsRateController,
};
