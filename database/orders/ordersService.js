import ordersData from "./ordersData.js";

const getOrders = async () => {
  const orders = await ordersData.getOrders();
  return orders;
};

const getOrdersById = async (id) => {
  const orders = await ordersData.getOrdersById(id);
  return orders;
};

const createOrder = async (newOrder) => {
  const updatedOrders = await ordersData.createOrder(newOrder);
  return updatedOrders;
};

const deleteOrder = async (id) => {
  const updatedProducts = await ordersData.deleteOrder(id);
  return updatedProducts;
};

export default {
  getOrders,
  getOrdersById,
  createOrder,
  deleteOrder,
};
