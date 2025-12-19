const { createOrder } = require("../services/OrderService");

async function insertOrder(req, res) {
  try {
    const { userId, products } = req.body;

    const order = await createOrder(userId, products);
    if (!order) {
      res.status(201).json({ message: "Invalid data" });
    }
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { insertOrder };
