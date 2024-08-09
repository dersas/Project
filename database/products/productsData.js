import { ObjectId } from "mongodb";
import dbService from "../db/mongo.js";

const productsCollection = "Books";

// Obter todos os produtos
const getProducts = async () => {
  const db = await dbService.getDb();
  const products = await db.collection(productsCollection).find().toArray();
  return products;
};

// Obter produtos pelo nome
const getProductsByName = async (productName) => {
  const db = await dbService.getDb();
  const products = await db
    .collection(productsCollection)
    .find({ name: { $regex: productName, $options: "i" } })
    .toArray();
  return products;
};

// Adicionar um novo produto
const createProduct = async (newProduct) => {
  const db = await dbService.getDb();
  const products = await db
    .collection(productsCollection)
    .insertOne(newProduct);

  return products;
};

const getProductById = async (productId) => {
  const db = await dbService.getDb();
  const products = await db
    .collection(productsCollection)
    .findOne({ _id: new ObjectId(productId) });
  return products;
};

// TODO: Editar um produto existente
const updateProduct = async (id, productUpdates) => {
  const db = await dbService.getDb();
  const result = await db
    .collection(productsCollection)
    .updateOne({ _id: new ObjectId(id) }, { $set: productUpdates });

  return result;
};

const deleteProduct = async (id) => {
  const db = await dbService.getDb();
  const products = await db
    .collection(productsCollection)
    .deleteOne({ _id: new ObjectId(id) });
  return products;
};

export default {
  getProducts,
  getProductsByName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
