 const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  content: { type: String, required: true },

  type: {
    type: String,
    enum: ['tip', 'article', 'event'], // tip = text, article = image, event = video
    required: true,
  },

  link: { type: String }, // local URL to uploaded media file (if any)

  timestamp: { type: Date, default: Date.now },

  likes: [
    {
      userId: String,
    }
  ],

  comments: [
    {
      user: { id: String, name: String },
      text: String,
      timestamp: { type: Date, default: Date.now },
    }
  ]
});

module.exports = mongoose.model('Post', postSchema);