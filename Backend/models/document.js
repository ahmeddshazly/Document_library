const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  numberofdownloads: {
    type: Number,
    required: true,
    default: 0,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  filepath: {
    type: String,
  },

  filename: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("document", documentSchema);
