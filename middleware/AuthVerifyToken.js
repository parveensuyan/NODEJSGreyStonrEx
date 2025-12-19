const jwt = require("jsonwebtoken");
const JWT_SECRET = "PARVEENSYN12334$#";

async function verifyToken(req, res, next) {
  var authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  var token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invaild token" });
  }
try{
  var decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded; // attach user info to request
  }
catch (err){
    return res.status(500).json(err.message);
  }

  next();
}
module.exports = { verifyToken };
