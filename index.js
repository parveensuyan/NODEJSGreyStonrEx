const express = require("express");
const mongoose = require("mongoose");
const ComputerCategorySchema = require("./ComputerCategoryModel");


const app = express();
app.use(express.json());

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

