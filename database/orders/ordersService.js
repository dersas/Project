import ordersData from "./ordersData.js";

const getOrders = async () => {
  const orders = await ordersData.getOrders();
  return orders;
};

const createOrder = async (newOrder) => {
  const updatedOrders = await ordersData.createOrder(newOrder);
  return updatedOrders;
};

export default {
  getOrders,
  createOrder,
};
