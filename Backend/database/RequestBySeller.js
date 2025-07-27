const mongoose = require('mongoose');

const request_sellerSchema = new mongoose.Schema({
  name: String,
  product: String,
  quantity: Number,
  price: Number,
  location: String,
  deliveryBy: String,
  status: {
    type: String,
    default: 'PENDING'
  }
});

module.exports = mongoose.model("RequestBySeller", request_sellerSchema);