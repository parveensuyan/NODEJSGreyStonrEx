
const { createUserService } = require("../Services/AuthService");

async function createUser(req,res){
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
module.exports = { createUser };