const { Schema, model } = require("mongoose");

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }
});

const Song = model("Song", songSchema);
module.exports = Song;
