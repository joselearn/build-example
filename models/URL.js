const Joi = require("joi");
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortUrlId: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
});

const url = mongoose.model("URL", urlSchema);

function validateUrl(url) {
  const schema = {
    url: Joi.string().required(),
  };

  return Joi.validate(url, schema);
}

exports.URL = url;
exports.validate = validateUrl;
