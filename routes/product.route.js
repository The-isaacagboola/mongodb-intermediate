const express = require("express");
const {
  addSampleProducts,
  getProductStats,
  getProductAnalysis,
} = require("../controllers/product.controllers");
const router = express.Router();

router.post("/add", addSampleProducts);

router.get("/stats", getProductStats);

router.get("/analysis", getProductAnalysis);
module.exports = router;
