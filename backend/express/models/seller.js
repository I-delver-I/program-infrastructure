const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  position: { type: String },
  salary: { type: Number },
  imagePath: { type: String },
});

module.exports = mongoose.model('Seller', sellerSchema);
