//models/Badge.js
const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  criteria: { type: String }, // Human-readable condition
 category: {
  type: String,
  enum: ['Low', 'Medium', 'High', 'Neutral', 'Varies', 'Any'], // ✅ Added 'Any'
  default: 'Any'
},

  icon: { type: String }, // Optional: URL or name of an emoji/icon
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Badge', badgeSchema);
