const mongoose = require("mongoose");

const flashCardSchema = new mongoose.Schema({
    question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  box: {
    type: Number,
    default: 1, // Starts in Box 1
    min: 1,
    max: 5,
  },
  nextReviewDate: {
    type: Date,
    default: Date.now, 
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "auth",
  // },

}, { timestamps: true });

const flashCardModel = mongoose.model("flashCard", flashCardSchema);
module.exports = flashCardModel;