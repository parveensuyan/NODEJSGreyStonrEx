const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ComputerCategorySchema = new Schema({
    name : {type : String, required  : true},
    description : {type : String},
    createdAt : {type : Date,default : Date.now()}
});
module.exports = mongoose.model("category", ComputerCategorySchema);
