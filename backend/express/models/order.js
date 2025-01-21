const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  viewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Viewer', required: true },
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  orderDate: { type: Date, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
