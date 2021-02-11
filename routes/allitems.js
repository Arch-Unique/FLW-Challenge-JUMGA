const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Shop = require("../models/shop");
const User = require("../models/user");
const mongoose = require("mongoose");

//get all shops
router.get("/shops", (req, res) => {
  Shop.find(function (err, shops) {
    if (err) {
      res.json({ status: "error", msg: err });
    }
    res.json({ status: "success", msg: shops });
  });
});

//get all products
router.get("/products", (req, res) => {
  Product.find(function (err, products) {
    if (err) {
      res.json({ status: "error", msg: err });
    }
    res.json({ status: "success", msg: products });
  });
});

//drop table
router.get("/drop", async (req, res) => {
  try {
    let colList = await mongoose.connection.db.listCollections().toArray();
    for (let index = 0; index < colList.length; index++) {
      const element = colList[index];
      const colname = element.name;
      if (colname != "jumga") {
        await mongoose.connection.db.dropCollection(colname);
      }
    }
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
