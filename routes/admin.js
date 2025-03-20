const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Coupon = require('../models/Coupon');
const Claim = require('../models/Claim');
const auth = require('../middleware/auth');

const ADMIN = { username: 'admin', password: 'securepass123' };

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN.username || password !== ADMIN.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.get('/coupons', auth, async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
});

router.post('/coupons', auth, async (req, res) => {
  const { code } = req.body;
  const coupon = new Coupon({ code });
  await coupon.save();
  res.json(coupon);
});

router.put('/coupons/:id', auth, async (req, res) => {
  const { isActive } = req.body;
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
  res.json(coupon);
});

router.get('/claims', auth, async (req, res) => {
  const claims = await Claim.find().populate('couponId', 'code');
  res.json(claims);
});

module.exports = router;