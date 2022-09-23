'use strict';

module.exports = function logger (req, res, next){
  console.log(`REQUEST LOGGING: ${req.method}, ${req.originalUrl}`);
  next();
};
