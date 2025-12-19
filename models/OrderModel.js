const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // purchased product
      quantity: Number,
    },
  ],
  totalPrice :{ type: Number, min: 0, required: true },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Order", OrderSchema);
