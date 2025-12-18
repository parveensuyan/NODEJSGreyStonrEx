const {
  createUserService,
  getUserByEmail,
  getUsers,
} = require("../Services/AuthService");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "PARVEENSYN12334$#";
const bcrypt = require("bcryptjs");

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (username == "" || email == "" || password == "") {
      return res.status(400).json({ message: "All fileds are required" });
    }
    const newUser = await createUserService(username, email, password);
    return res
      .status(201)
      .json({ message: "User Created Successfuly", newUser });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (email == "" || password == "") {
      return res.status(400).json({ message: "All fileds are required" });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user!" });
    }
    const matchPassword = bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Unauthorized user!" });
    }
    const token = await jwt.sign(
      {
        id: user._id,
        email,
      },
      JWT_SECRET
    );
    res.json({ token: token });
  } catch (err) {
    res.status(500).json(err.message);
  }
}
async function getAllUser(req, res) {
  const user = await getUsers();
  return res.status(200).json({ message: "success", data: user });
}
function showMessage(req, res) {
  return res.status(200).json({ message: "success" });
}
module.exports = { createUser, login, getAllUser, showMessage };
