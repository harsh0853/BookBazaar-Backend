const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getProfile,
  updateProfile,
  getBook,
} = require("../controllers/userController");

router.get("/getProfile", auth, getProfile);
router.put("/updateProfile", auth, updateProfile);
router.get("/getBook", auth, getBook);

module.exports = router;
