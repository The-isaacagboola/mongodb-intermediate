const Product = require("../model/product.model");

const addSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        instock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 806,
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
      message: "Some error occured!",
    });
  }
};

module.exports = {
  addSampleProducts,
};
