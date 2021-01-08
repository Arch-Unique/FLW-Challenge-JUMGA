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
    body.owner = id;
    let myshop = new Shop(body);

    user.shops.push(myshop);
    user
      .save()
      .then((result) => {
        res.json({
          status: "error",
          msg: "Shops successfully created",
          data: result,
        });
      })
      .catch((err) => res.json({ status: "error", msg: err }));
  });
});

//get all user shops
router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => res.json({ status: "success", msg: user.shops }))
    .catch((err) => res.json({ status: "error", msg: err }));
});

//get a particular user shop
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Shop.findById(id)
    .then((shop) => res.json({ status: "success", msg: shop }))
    .catch((err) => res.json({ status: "error", msg: err }));
});

//edit a particular shop
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  Shop.findByIdAndUpdate(id, req.body, function (err, result) {
    if (err) {
      res.json({ status: "error", msg: err });
    }
    res.json({
      status: "success",
      msg: "shop successfully updated",
      data: result,
    });
  });
});

//delete a particular shop
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Shop.findByIdAndDelete(quesId)
    .then((result) =>
      res.json({ status: "success", msg: "shop successfully deleted" })
    )
    .catch((err) => res.json({ status: "error", msg: err }));
});

module.exports = router;
