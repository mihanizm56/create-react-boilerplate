const express = require('express');
const {
  parentSubjectsController,
} = require('../../controllers/parent-subjects');

const parentSubjectsRouter = express.Router();

parentSubjectsRouter.get('/', parentSubjectsController);

module.exports.parentSubjectsRouter = parentSubjectsRouter;
