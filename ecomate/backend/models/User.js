const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // <-- change to optional
    firebaseUid: String, // To track Firebase user if needed

  carbonGoal: {
    type: Number,
    default: 0
  },
  currentFootprint: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);