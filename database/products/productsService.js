import { ObjectId } from "mongodb";
import productsData from "./productsData.js";

const getProducts = async () => {
  const products = await productsData.getProducts();
  return products;
};

const getProductsByName = async (productName) => {
  const products = await productsData.getProductsByName(productName);
  return products;
};

const getProductById = async (id) => {
  const products = await productsData.getProductById(id);
  return products;
};

const createProduct = async (newProduct) => {
  const createdProducts = await productsData.createProduct(newProduct);
  const product = await productsData.getProductById(createdProducts.insertedId);
  return product;
};

// TODO: Editar um produto existente
const updateProduct = async (id, productUpdates) => {
  await productsData.updateProduct(id, productUpdates);
  const product = await productsData.getProductById(id);

  return product;
};

const deleteProduct = async (id) => {
  const updatedProducts = await productsData.deleteProduct(id);
  return updatedProducts;
};

export default {
  getProducts,
  getProductsByName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
