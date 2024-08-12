import dbService from "../db/mongo.js";
import { ObjectId } from "mongodb";

const ordersCollection = "Orders";

const getOrders = async () => {
  const db = await dbService.getDb();
  const orders = await db.collection(ordersCollection).find().toArray();
  console.log(orders);
  return orders;
};

const getOrdersById = async (productId) => {
  const db = await dbService.getDb();
  const orders = await db
    .collection(ordersCollection)
    .findOne({ _id: new ObjectId(productId) });
  console.log(orders);
  return orders;
};

const createOrder = async (newOrder) => {
  const db = await dbService.getDb();
  const result = await db.collection(ordersCollection).insertOne({
    ...newOrder,
    createdAt: new Date(), // Adiciona a data de criação
  });
  return result.insertedId;
};

const deleteOrder = async (id) => {
  const db = await dbService.getDb();
  const orders = await db
    .collection(ordersCollection)
    .deleteOne({ _id: new ObjectId(id) });
  return orders;
};

export default {
  getOrders,
  getOrdersById,
  createOrder,
  deleteOrder,
};
