const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "Permission denied. Admin access required",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
