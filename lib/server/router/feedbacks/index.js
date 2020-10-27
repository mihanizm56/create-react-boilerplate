const express = require('express');
const {
  feedbacksAverageRateController,
  feedbacksTopItemsRateController,
} = require('../../controllers/feedbacks');

const feedbacksRouter = express.Router();

feedbacksRouter.get('/products/rating', feedbacksAverageRateController);
feedbacksRouter.get('/products/rating/top', feedbacksTopItemsRateController);

module.exports.feedbacksRouter = feedbacksRouter;
