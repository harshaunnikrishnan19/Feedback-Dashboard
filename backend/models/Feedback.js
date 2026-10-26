const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
      default: () => 'CRS-' + Math.floor(1000 + Math.random() * 9000)
    },
    courseName: {
      type: String,
      required: true,
      trim: true
    },
    courseDuration: {
      type: String,
      default: '4 Weeks'
    },
    feedbackComments: {
      type: String,
      required: true,
      trim: true
    },
    feedbackRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);