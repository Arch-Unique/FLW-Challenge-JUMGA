const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/product");
const Shop = require("../models/shop");

//For one user

//create user shop
router.post("/user/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) {
      throw err;
    }
    body.owner = user;
    let myshop = new Shop(body);

    user.shops.push(myshop);
    user
      .save()
      .then((result) => {
        res.status(200).json({ msg: "Shops successfully created" });
      })
      .catch((err) => res.status(400).json({ msg: err }));
  });
});

//get all user shops
router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => res.status(200).json({ msg: user.shops }))
    .catch((err) => res.status(400).json({ msg: err }));
});

//get a particular user shop
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Shop.findById(id)
    .then((shop) => res.status(200).json({ msg: shop }))
    .catch((err) => res.status(400).json({ msg: err }));
});

//edit a particular shop
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  Shop.findByIdAndUpdate(id, req.body, function (err, result) {
    if (err) {
      throw err;
    }
    res.status(200).json({ msg: "shop successfully updated" });
  });
});

//delete a particular shop
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Shop.findByIdAndDelete(quesId)
    .then((result) =>
      res.status(200).json({ msg: "shop successfully deleted" })
    )
    .catch((err) => res.status(400).json({ msg: err }));
});

//get all shops
router.get("/", (req, res) => {
  const id = req.params.id;

  Shop.find(function (err, shops) {
    if (err) throw err;
    res.status(200).json({ msg: shops });
  });
});

module.exports = router;
