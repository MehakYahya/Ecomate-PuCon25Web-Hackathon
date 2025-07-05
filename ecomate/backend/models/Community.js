// models/Community.js
const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  carbonReductionGoal: { type: Number, default: 0 },
goalPeriodMonths: { type: Number, default: 1 },

});

module.exports = mongoose.model('Community', communitySchema);