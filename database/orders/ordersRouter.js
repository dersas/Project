import express from "express";
import ordersService from "./ordersService.js";
import ordersSchemas from "./ordersSchema.js";

const router = express.Router();

router.get("/orders", async (req, res) => {
  const orders = await ordersService.getOrders();
  res.json(orders);
});

router.post("/orders", async (req, res) => {
  const { error, value } = ordersSchemas.createOrderSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }

  const updatedOrdersList = await ordersService.createOrder(value);
  res.json(updatedOrdersList);
});

router.delete("/orders/:id", async (req, res) => {
  const result = await ordersService.getOrdersById(req.params.id);
  if (!result || result.deletedCount === 0) {
    res.status(404).send("Id not found");
  }

  await ordersService.deleteOrder(req.params.id);

  res.send("Product deleted");
});

export default router;
