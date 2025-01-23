const Product = require("../model/product.model");

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      //stage 1
      {
        $match: {
          instock: false,
          price: {
            $gte: 100,
          },
        },
      },
      //stage 2 : group documents
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json({
      size: result.length,
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error getting product stats",
    });
  }
};

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
          averagePrice: {
            $avg: "$price",
          },
          maxProductPrice: {
            $max: "$price",
          },
          minProductPrice: {
            $min: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ["$maxProductPrice", "$minProductPrice"],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.errorResponse.errmsg,
    });
  }
};
const addSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 99,
        instock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 86,
        instock: true,
        tags: ["moblie", "tech"],
      },
      {
        name: "Laptop",
        category: "Electronics",
        price: 205,
        instock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 89,
        instock: true,
        tags: ["footwear", "running"],
      },
    ];

    const result = await Product.insertMany(sampleProducts);

    res.status(201).json({
      success: true,
      message: result.length + " Products created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable tO Add products",
    });
  }
};

module.exports = {
  addSampleProducts,
  getProductStats,
  getProductAnalysis,
};
