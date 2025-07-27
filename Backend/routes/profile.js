const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../database/profile');

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
});

router.put('/update', auth, async (req, res) => {
  try {
    const { profilePic, coverPhoto, tagline } = req.body;
    const userId = req.user.userId;
    const updated = await User.findByIdAndUpdate(
      userId,
      { profilePic, coverPhoto, tagline },
      { new: true }
    );
    res.json({ message: 'Profile updated', user: updated });
  } catch (err) {
    res.status(500).json({ message: 'Profile update failed', error: err.message });
  }
});

module.exports = router;