const express = require('express');
const cats = require('../routes/cats');
const urls = require('../routes/shortUrl');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/shortUrl', urls);
  app.use('/api/cats', cats);
  app.use(error);
}