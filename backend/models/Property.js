const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Property price is required'],
      min: [0, 'Price must be a positive number'],
    },
    location: {
      type: String,
      required: [true, 'Property location is required'],
      trim: true,
      maxlength: [300, 'Location cannot exceed 300 characters'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Property', propertySchema);
