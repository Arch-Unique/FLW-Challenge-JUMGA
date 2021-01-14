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
    shop.products.push(myproduct.id);
    shop
      .save()
      .then((result) => {
        res.json({
          status: "success",
          msg: "Product successfully created",
          data: result,
        });
      })
      .catch((err) => res.json({ status: "error", msg: err }));
  });
});

//get all shop's product
router.get("/shop/:id", (req, res) => {
  const id = req.params.id;
  Shop.findById(id)
    .then((user) => res.json({ status: "success", msg: shop.products }))
    .catch((err) => res.json({ status: "error", msg: err }));
});

//get a particular product
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => res.json({ status: "success", msg: product }))
    .catch((err) => res.json({ status: "error", msg: err }));
});

//edit a shop product
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, function (err, result) {
    if (err) {
      res.json({ status: "error", msg: err });
    }
    res.json({
      status: "success",
      msg: "Product successfully updated",
      data: result,
    });
  });
});

//delete a particular product
router.delete("/:id", (req, res) => {
  const id = req.body.id;
  Product.findByIdAndDelete(id)
    .then((result) =>
      res.json({
        status: "success",
        msg: "Product successfully deleted",
      })
    )
    .catch((err) => res.json({ status: "error", msg: err }));
});

module.exports = router;
