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

export default router;
