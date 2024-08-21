const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({
        success: false,
        message: "Email already registered, user another email id",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).send({
      success: true,
      message: "User registered!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not fount",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );
    res.status(200).json({
      success: true,
      token,
      message: "Logged in successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Error",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
