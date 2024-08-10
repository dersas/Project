import dbService from "../db/mongo.js";

const ordersCollection = "Orders";

const getOrders = async () => {
  const db = await dbService.getDb();
  const orders = await db.collection(ordersCollection).find().toArray();
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

export default {
  getOrders,
  createOrder,
};
