const bcrypt = require("bcrypt");
const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(400)
        .json({ message: "User not found while fetching the profile" });
    const data = {
      name: user.name,
      email: user.email,
      book: user.book,
    };
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ message: "Error while fetching user" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { email, password, book } = req.body;
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "No user found." });
    }
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (book) user.book += book;

    await user.save();

    return res.status(200).json({ message: "All fields updated successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Error while updating" });
  }
};

const getBook = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user)
      return res.status(400).json({ message: "No user found for books" });
    return res.status(200).json({ book: user.book });
  } catch (err) {
    return res.status(400).json({ message: "Error while fetching the books" });
  }
};

module.exports = { getProfile, updateProfile, getBook };
