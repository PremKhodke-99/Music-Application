const { register, login } = require("../controller/user.controller");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
