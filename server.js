require("dotenv").config();

const connectDb = require("./config/db");
const productRoutes = require("./routes/product.route");
const bookRoutes = require("./routes/book.route");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares
app.use(express.json());

//routes
app.use("/product", productRoutes);
app.use("/book", bookRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on PORT ${PORT}`);
});
