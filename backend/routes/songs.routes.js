const { getAllSongs, addSongs } = require("../controller/song.controller");

const router = require("express").Router();

router.get("/", getAllSongs);
router.post("/", addSongs);

module.exports = router;