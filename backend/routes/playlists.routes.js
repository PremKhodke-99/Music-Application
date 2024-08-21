const { userPlaylist, newPlaylist } = require("../controller/playlist.controller");

const router = require("express").Router();

router.get('/:userId', userPlaylist);
router.post("/", newPlaylist);

module.exports = router;
