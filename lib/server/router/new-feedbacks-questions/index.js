const express = require('express');

const {
  newFeedbacksQuestionsController,
} = require('../../controllers/new-feedbacks-questions');

const newFeedbacksQuestionsRouter = express.Router();

newFeedbacksQuestionsRouter.get('/', newFeedbacksQuestionsController);

module.exports.newFeedbacksQuestionsRouter = newFeedbacksQuestionsRouter;
