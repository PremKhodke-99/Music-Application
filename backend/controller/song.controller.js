const Song = require("../models/Song.model");

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const addSongs = async (req, res) => {
  const { title, audioFile, artist, album, coverImage } = req.body;
  try {
    const song = new Song({
        title,
        audioFile,
        artist,
        album,
        coverImage
    });
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({
        error: error.message
    })
  }
};

module.exports = {
  getAllSongs,
  addSongs,
};
