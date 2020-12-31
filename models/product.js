const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    images: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 3,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
