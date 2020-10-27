const { devServerLog } = require('../../../utils/dev-server-logger');

const newFeedbacksQuestionsController = (req, res) => {
  devServerLog('info', 'newFeedbacksQuestionsController get request');

  res.status(200).json({
    error: false,
    errorText: '',
    data: { hasNewFeedbacks: true, hasNewQuestions: false },
  });
};

module.exports = {
  newFeedbacksQuestionsController,
};
