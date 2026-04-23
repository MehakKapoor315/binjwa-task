const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Insight title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Insight', insightSchema);
