const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema(
  {
    jumga: Number,
    shop_owner: Number,
    total_amount: Number,
    dispatch_rider: Number,
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
