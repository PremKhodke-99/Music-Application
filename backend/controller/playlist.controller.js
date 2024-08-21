const Playlist = require("../models/Playlist.model");

const userPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.find({
      userId: req.params.userId,
    }).populate("songs");
    res.json(playlist);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const newPlaylist = async (req, res) => {
  const { name, userId, songs } = req.body;
  try {
    const playlist = new Playlist({
      name,
      userId,
      songs,
    });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
    userPlaylist,
    newPlaylist
}
