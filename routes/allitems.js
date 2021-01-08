const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Shop = require("../models/shop");
const User = require("../models/user");

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

module.exports = router;
