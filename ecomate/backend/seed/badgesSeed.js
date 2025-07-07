const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Badge = require('../models/Badge');

dotenv.config(); // Load your .env with MongoDB URI

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');

  const badges = [
    {
      name: 'Eco Starter',
      description: 'Logged your first sustainable activity',
      criteria: 'Log 1 activity',
      category: 'Any',
      icon: '🌱'
    },
    {
      name: 'Tree Hero',
      description: 'You’re helping the planet grow',
      criteria: 'Plant 10 trees',
      category: 'High',
      icon: '🌳'
    },
    {
      name: 'Transport Saver',
      description: 'Choosing low-carbon mobility',
      criteria: 'Bike/Walk 100 km total',
      category: 'Medium',
      icon: '🚲'
    },
    {
      name: 'Carbon Crusher',
      description: 'You’re a CO₂-saving champion',
      criteria: 'Save 100+ kg CO₂ across all activities',
      category: 'High',
      icon: '🧯'
    },
    {
      name: 'Recycler Pro',
      description: 'Turning waste into impact',
      criteria: 'Recycle 20 kg of material',
      category: 'Medium',
      icon: '♻️'
    },
    {
      name: 'Meatless Master',
      description: 'Going green with meals',
      criteria: 'Log 10 meatless meals',
      category: 'Medium',
      icon: '🥦'
    },
    {
      name: 'Energy Aware',
      description: 'Conscious of your electricity use',
      criteria: 'Log 500+ kWh of electricity',
      category: 'Low',
      icon: '💡'
    },
    {
      name: 'Streak Champion',
      description: 'Consistency is key',
      criteria: 'Log activities 7 days in a row',
      category: 'Any',
      icon: '🔥'
    },
    {
      name: 'Eco Community Star',
      description: 'Participated in group efforts',
      criteria: 'Join 3+ community challenges',
      category: 'Varies',
      icon: '🌍'
    },
    {
      name: 'Goal Smasher',
      description: 'Reached your personal/community CO₂ goal',
      criteria: 'Achieve 100% of reduction goal',
      category: 'High',
      icon: '🏁'
    }
  ];

  await Badge.deleteMany({});
  await Badge.insertMany(badges);
  console.log('Badges seeded successfully!');
  process.exit();

}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
