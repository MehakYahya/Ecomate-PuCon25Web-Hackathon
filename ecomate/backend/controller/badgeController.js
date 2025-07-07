//badgeController.js
const UserBadge = require('../models/UserBadge');
const Badge = require('../models/Badge');

exports.getUserBadges = async (req, res) => {
  try {
const userId = req.user.id;

    // Find earned badges and populate badge details
    const earned = await UserBadge.find({ user: userId }).populate('badge');

    res.status(200).json(earned.map(entry => ({
      name: entry.badge.name,
      description: entry.badge.description,
      icon: entry.badge.icon,
      awardedAt: entry.earnedAt,
      category: entry.badge.category
    })));
    console.log('Earned badges fetched for user:', userId, earned.length);

  } catch (err) {
    console.error('Error fetching user badges:', err);
    res.status(500).json({ message: 'Failed to fetch badges' });
  }
};
