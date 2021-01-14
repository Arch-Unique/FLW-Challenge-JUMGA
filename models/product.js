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
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

productSchema.virtual("shopOwner", {
  ref: "Shop", //The Model to use
  localField: "_id", //Find in Model, where localField
  foreignField: "products", // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
