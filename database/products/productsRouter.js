import express from "express";
import productsService from "./productsService.js";
import productsSchemas from "./productsSchemas.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  const name = req.query.name;

  if (name) {
    const products = await productsService.getProductsByName(name);
    return res.status(200).json(products);
  }

  const products = await productsService.getProducts();
  res.json(products);
});

router.post("/products", async (req, res) => {
  const { error, value } = productsSchemas.createProductSchema.validate(
    req.body
  );

  if (error) {
    return res.status(400).send(error.message);
  }

  const updatedProductsList = await productsService.createProduct(value);
  res.status(201).json(updatedProductsList);
});

router.put("/products/:id", async (req, res) => {
  const result = await productsService.updateProduct(req.params.id, req.body);
  if (!result || result.modifiedCount === 0) {
    return res
      .status(404)
      .json({ message: "The Product you tried to update was not found." });
  }
  res.json(result);
});

router.delete("/products/:id", async (req, res) => {
  const result = await productsService.getProductById(req.params.id);
  if (!result || result.deletedCount === 0) {
    res.status(404).send("Id not found");
  }

  await productsService.deleteProduct(req.params.id);

  res.send("Product deleted");
});

export default router;
