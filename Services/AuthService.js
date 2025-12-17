const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function createUserService( username, email, password){
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    return newUser
};
module.exports = { createUserService };