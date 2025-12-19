const Order = require("../models/OrderModel");
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");

async function createOrder(userId, products) {
  const user = await User.findById(userId);
  if (!user) {
    return false;
  }
  var totalPrice = 0;
  for (const item of products) {
    const productDetails = await Product.findById(item.product);
    if (!productDetails) {
      return false;
    }
    totalPrice += item.quantity * productDetails.price;
  }
  const OrderData = new Order({
    userId: userId,
    products: { products },
    totalPrice,
  });
  const newOrder = await OrderData.save();
const populatedOrder = await newOrder.populate([
  { path: "userId", select: "name email" },
  { path: "products.product", select: "name price" },
]);
return populatedOrder;
}
module.exports = { createOrder };
