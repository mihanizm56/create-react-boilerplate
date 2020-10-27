const express = require('express');

const { topRatedProductsController } = require('../../controllers/questions');

const questionsRouter = express.Router();

questionsRouter.get('/products/rating', topRatedProductsController);

module.exports.questionsRouter = questionsRouter;
