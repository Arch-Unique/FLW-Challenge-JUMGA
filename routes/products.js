const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Shop = require("../models/shop");

//For one user

//create user product
router.post("/shop/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Shop.findById(id, function (err, shop) {
    if (err) {
      throw err;
    }
    let myproduct = new Product(body);
    shop.products.push(myproduct);
    shop
      .save()
      .then((result) => {
        res.status(200).json({ msg: "Product successfully created" });
      })
      .catch((err) => res.status(400).json({ msg: err }));
  });
});

//get all shop's product
router.get("/shop/:id", (req, res) => {
  const id = req.params.id;
  Shop.findById(id)
    .then((user) => res.status(200).json({ msg: shop.products }))
    .catch((err) => res.status(400).json({ msg: err }));
});

//get a particular product
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => res.status(200).json({ msg: product }))
    .catch((err) => res.status(400).json({ msg: err }));
});

//edit a shop product
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, function (err, result) {
    if (err) {
      throw err;
    }
    res.status(200).json({ msg: "Product successfully updated" });
  });
});

//delete a particular product
router.delete("/:id", (req, res) => {
  const id = req.body.id;
  Product.findByIdAndDelete(id)
    .then((result) =>
      res.status(200).json({ msg: "Product successfully deleted" })
    )
    .catch((err) => res.status(400).json({ msg: err }));
});

module.exports = router;
