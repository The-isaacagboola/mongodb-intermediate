const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected succesfully");
  } catch (error) {
    console.log("Error connecting with Database. Please try again", error);
  }
};

module.exports = connectDb;
