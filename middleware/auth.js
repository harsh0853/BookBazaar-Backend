const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Not a valid header" });
  }
  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not a valid bearer" });
  }

  try {
    const token = header.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Internal error in authenticate" });
  }
};

module.exports = authenticate;
