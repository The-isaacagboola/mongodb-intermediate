require("dotenv").config();

const connectDb = require("./config/db");
const productRoute = require("./routes/product.route");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares
app.use(express.json());
app.use("/product", productRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on PORT ${PORT}`);
});
