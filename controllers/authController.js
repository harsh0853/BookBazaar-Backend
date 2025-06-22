const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const SECRET = process.env.SECRET || "asecretkeythatyoucanseehere";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required to register" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      book: 0,
    });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET);
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error while registering" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required to login." });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const decryptedPassword = await bcrypt.compare(password, user.password);

    if (!decryptedPassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET);
    return res.status(200).json({ token: token });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Internal server error while logging in" });
  }
};

module.exports = { register, login };
