const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.role) {
      return res.status(401).json({ message: "No user found" });
    }
    if (!roles.includes(req.role)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  };
};

module.exports = authorize;
