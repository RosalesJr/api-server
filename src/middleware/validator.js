'use strict';

const errorHandler = require('../error-handlers/500');

module.exports = function (req, res, next) {
  let { name } = req.query;
  try {
    if(name) {
      res.status(200).send({
        name: name,
      });
    } else {
      errorHandler();
    }
  } catch (error) {
    next(error.message);
  }
};
