//routes/badgeRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getUserBadges } = require('../controller/badgeController');

router.get('/my', auth, getUserBadges);

module.exports = router;
