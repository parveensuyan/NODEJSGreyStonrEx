const express =  require("express");
const mongoose = require("mongoose");
const ComputerCategorySchema = require("./ComputerCategoryModel")

const app = express();
app.use(express.json());
//payload into json
const MONGO_URL = "mongodb://mongo:27017/computerdb";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.post("/api/add-category",async(req,res)=>{
      try {
          const categorySchema = new ComputerCategorySchema(req.body);
          var category = categorySchema.save();
          res.status(201).json({message : "Category created Successfully",category});
      } catch (err) {
         res.status(400).json(err);
      }
});

app.get("/api/category",async (req,res)=>{
    try{
    const categories = ComputerCategorySchema.find();
    res.status(200).json({ message: "success", data : categories });
    }
    catch(err){
     res.status(400).json(err);
    }
})

app.get("/api/category:id", async (req, res) => {
  try {
    const id =  req.params.id
    const category = ComputerCategorySchema.findById(id);
    if (!category){
    return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json({ message: "success", data: category });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.delete("/api/category:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = ComputerCategorySchema.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put("/api/category:id",async(req,res)=>{
    try{
    const id = req.params.id;
    const category = ComputerCategorySchema.findByIdAndUpdate(id, {
      name: req.body.name,
      description: req.body.description,
    },
    
    );
    if (!category) {
    return res.status(404).json({ message: "Not Found" });
    }
    }
    catch(err){

    }
})

app.post("/register", async(req,res)=>{
const {username,email,password} = req.body
if(username == '' || email =='' || password ==''){
    res.status(400).json("eror");
}
const hashpwd =  await bcrypt.hash(password,10);
const newuser =  new user({
    username,email,password
})
})