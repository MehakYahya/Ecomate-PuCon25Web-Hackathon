//activityController.js
const Activity = require('../models/Activity');
const checkAndAwardBadges = require('../utils/badgeEvaluator');

exports.logActivity = async (req, res) => {
  try {
const userId = req.user.id;
    const { type, amount, emission } = req.body;

    const newActivity = await Activity.create({
      user: userId,
      type,
      amount,
      emission,
    });

    // 🏅 Check & award badges
    const awarded = await checkAndAwardBadges(userId);
console.log('Awarded badges:', awarded);
console.log('🧠 Evaluating badges for user:', userId);

    res.status(201).json({
      message: 'Activity logged successfully.',
      awardedBadges: awarded, // optional for frontend
    });
  } catch (err) {
    console.error('Error logging activity:', err);
    res.status(500).json({ message: 'Failed to log activity' });
  }
};
