import dotenv from "dotenv";
import express from "express";
import productsRouter from "./products/productsRouter.js";
import ordersRouter from "./orders/ordersRouter.js";
import dbService from "./db/mongo.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your React app
    credentials: true, // Allow credentials (cookies, authorization headers, etc)
  })
);
app.use(express.json());

app.use(productsRouter);
app.use(ordersRouter);

await dbService.initializeDb(); // Inicializa a BD

app.listen(PORT, () => {
  console.log("Server running", PORT);
});
