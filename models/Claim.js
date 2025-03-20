const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  couponId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Claim', claimSchema);