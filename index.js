const express = require("express");
const mongoose = require("mongoose");
const ComputerCategorySchema = require("./models/ComputerCategoryModel");
const User = require("./models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "PARVEENSYN12334$#"; 

const { createUser } = require("./Controller/UserController");

const app = express();
app.use(express.json());

app.post("/api/register", createUser);

// app.post("/api/login",async(req,res)=>{

//     try{
//         const {email,password} = req.body;
//           if ( email == "" || password == "") {
//             return res.status(400).json({ message: "All fileds are required" });
//           }
//           const user =  await User.findOne({email})
//           if(!user){
//             return res.status(401).json({ message: "Unauthorized user!" });  
//           }
//           const matchPassword = bcrypt.compare(password, user.password);
//           if (!matchPassword) {
//             return res.status(401).json({ message: "Unauthorized user!" });
//           }
//           const token  =  await jwt.sign({
//               id : user._id,
//               email 
//             },JWT_SECRET);
//           res.json({token:token});
//     }
//     catch(err){
//        res.status(500).json(err.message)
//     }
// });






















const MONGO_URL = "mongodb://mongo:27017/computerdb";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.post("/api/add-category", async (req, res) => {
  try {
    const categorySchema = new ComputerCategorySchema(req.body);
    const category = await categorySchema.save();
    res
      .status(201)
      .json({ message: "Category created Successfully", category });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await ComputerCategorySchema.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/categories/:id", async (req, res) => {
  try {
    const category = await ComputerCategorySchema.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
app.put("/api/categories/:id", async (req, res) => {
  try {
    const updatedCategory = await ComputerCategorySchema.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        createdAt: req.body.createdAt,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.patch("/categories/:id", async (req, res) => {
  try {
    const updatedCategory = await ComputerCategorySchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete("/api/categories/:id", async (req, res) => {
  try {
    const deletedCategory = await ComputerCategorySchema.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully", deletedCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


