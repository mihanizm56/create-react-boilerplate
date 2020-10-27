const express = require('express');
const { questionsRouter } = require('./questions');
const { newFeedbacksQuestionsRouter } = require('./new-feedbacks-questions');
const { feedbacksRouter } = require('./feedbacks');
const { parentSubjectsRouter } = require('./parent-subjects');

const rootRouter = express.Router();

rootRouter.use('/questions', questionsRouter);
rootRouter.use('/feedbacks', feedbacksRouter);
rootRouter.use('/new-feedbacks-questions', newFeedbacksQuestionsRouter);
rootRouter.use('/parent-subjects', parentSubjectsRouter);

module.exports.rootRouter = rootRouter;
