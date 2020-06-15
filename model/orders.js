const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  Razorpayid: String,
  Kind: String,
  Amount: Number,
  Description: String,
  Comments: String,
  Status: String,
});

mongoose.model('Orders', orderSchema);

module.exports = mongoose.model('Orders');
