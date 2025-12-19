const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

async function createUserService( username, email, password){
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    return newUser
};

async function getUserByEmail(email){

    const user = await User.findOne({ email });
    return user;
}
async function getUsers() {
  const user = await User.find();
  return user;
}
module.exports = { createUserService, getUserByEmail, getUsers };