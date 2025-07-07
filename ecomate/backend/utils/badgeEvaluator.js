const Activity = require('../models/Activity');
const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const Challenge = require('../models/Challenge'); // for Eco Community Star
const User = require('../models/User'); // for Goal Smasher 

async function checkAndAwardBadges(userId) {
  const activities = await Activity.find({ user: userId });

  const earnedBadges = [];

  const totals = {
    totalActivities: activities.length,
    treeCount: 0,
    bikeWalkKm: 0,
    recycledKg: 0,
    meatlessMeals: 0,
    carbonSaved: 0,
    electricityKwh: 0,
    activityDates: new Set()
  };

  for (const a of activities) {
    if (a.createdAt && !isNaN(new Date(a.createdAt))) {
  const date = new Date(a.createdAt).toISOString().split('T')[0];
  totals.activityDates.add(date);
}

    if (a.type === 'tree') totals.treeCount += a.amount;
    if (a.type === 'bike' || a.type === 'walk') totals.bikeWalkKm += a.amount;
    if (a.type === 'recycling') totals.recycledKg += a.amount;
    if (a.type === 'meatless') totals.meatlessMeals += a.amount;
    if (a.type === 'electricity') totals.electricityKwh += a.amount;
    if (a.emission < 0) totals.carbonSaved += Math.abs(a.emission);
  }

  // Streak check
  const sortedDates = Array.from(totals.activityDates).sort();
  let streak = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const prev = new Date(sortedDates[i - 1]);
    const curr = new Date(sortedDates[i]);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      streak++;
    } else {
      streak = 1;
    }
    if (streak >= 7) break;
  }

  // Challenge participation
  const joinedChallenges = await Challenge.countDocuments({ participants: userId });

  // Goal progress check
  const user = await User.findById(userId);
  const goalSmashed = user && user.carbonGoal > 0 && user.currentFootprint <= user.carbonGoal;

  console.log('🧾 Totals:', totals);

  const badgeConditions = [
    { name: 'Eco Starter', valid: totals.totalActivities >= 1 },
    { name: 'Tree Hero', valid: totals.treeCount >= 10 },
    { name: 'Transport Saver', valid: totals.bikeWalkKm >= 100 },
    { name: 'Recycler Pro', valid: totals.recycledKg >= 20 },
    { name: 'Meatless Master', valid: totals.meatlessMeals >= 10 },
    { name: 'Carbon Crusher', valid: totals.carbonSaved >= 100 },
    // 👇 Newly added badges:
    { name: 'Energy Aware', valid: totals.electricityKwh >= 500 },
    { name: 'Streak Champion', valid: streak >= 7 },
    { name: 'Eco Community Star', valid: joinedChallenges >= 3 },
    { name: 'Goal Smasher', valid: goalSmashed }
  ];

  for (const b of badgeConditions) {
    console.log(`🏅 Evaluating: ${b.name} → valid?`, b.valid);

    if (b.valid) {
      const badge = await Badge.findOne({ name: b.name });
      console.log(`🔍 Badge "${b.name}" found in DB?`, badge ? '✅ Yes' : '❌ No');

      if (!badge) continue;

      const alreadyEarned = await UserBadge.findOne({ user: userId, badge: badge._id });
      console.log(`📌 Already earned "${b.name}"?`, alreadyEarned ? '✅ Yes' : '❌ No');

      if (!alreadyEarned) {
        await UserBadge.create({ user: userId, badge: badge._id });
        earnedBadges.push(b.name);
        console.log(`🎉 Awarded badge: ${b.name}`);
      }
    }
  }

  return earnedBadges;
}

module.exports = checkAndAwardBadges;
