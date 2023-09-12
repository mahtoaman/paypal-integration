import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; // Add body-parser

import * as paypal from "./paypal-api.js";

const { PORT = 8888 } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json()); // Add body-parser middleware

// Define a route handler for rendering the checkout page
app.get("/", async (req, res) => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  try {
    const clientToken = await paypal.generateClientToken();
    res.render("checkout", { clientId, clientToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Define a route for creating orders
app.post("/api/orders", async (req, res) => {
  try {
    console.log(req.body)
    const order = await paypal.createOrder(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Define a route for capturing payments
app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
});
