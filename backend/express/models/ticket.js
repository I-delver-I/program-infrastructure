const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  seatNumber: { type: String, required: true },
  purchaseTime: { type: Date },
  showTime: { type: Date, required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);
