const express = require("express");
const productRoutes = require("./routes/productRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();
app.use(express.json());

app.use("/products", productRoutes);
app.use("/search", searchRoutes);

app.get("/", (req, res) => res.send("jumbotail backend (placeholder)"));

module.exports = app;
