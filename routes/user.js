const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const Claim = require('../models/Claim');

router.get('/claim-coupon', async (req, res) => {
  const ip = req.ip;
  const claimedCookie = req.cookies.claimed;

  // Check abuse prevention
  const recentClaim = await Claim.findOne({ ip, timestamp: { $gt: Date.now() - 24 * 60 * 60 * 1000 } });
  if (recentClaim || claimedCookie) {
    return res.status(429).json({ message: 'You can only claim once every 24 hours' });
  }

  // Get next available coupon
  const coupon = await Coupon.findOneAndUpdate(
    { isClaimed: false, isActive: true },
    { isClaimed: true },
    { sort: { createdAt: 1 }, new: true }
  );

  if (!coupon) return res.status(404).json({ message: 'No coupons available' });

  // Log claim
  await new Claim({ ip, couponId: coupon._id }).save();

  // Set cookie
  res.cookie('claimed', 'true', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

  res.json({ message: 'Coupon claimed!', code: coupon.code });
});

module.exports = router;