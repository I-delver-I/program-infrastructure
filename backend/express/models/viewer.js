const mongoose = require('mongoose');

const viewerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
});

module.exports = mongoose.model('Viewer', viewerSchema);