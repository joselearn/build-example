const Joi = require('joi');
const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Cat = mongoose.model('cat', catSchema);

function validateCat(cat) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(cat, schema);
}

exports.catSchema = catSchema;
exports.Cat = Cat; 
exports.validate = validateCat;