const express = require("express");
const Shop = require("../models/shop");
const router = express.Router();
const User = require("../models/user");

//create user
router.post("/", (req, res) => {
  const body = req.body;
  User.create(body)
    .then((result) => {
      res.json({
        status: "success",
        msg: "User successfully created",
        data: result,
      });
    })
    .catch((err) => res.json({ status: "error", msg: err }));
});

//get user
router.get("/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .populate({
      path: "shops",
      populate: {
        path: "dispatch_rider",
      },
    })
    .exec()
    .then((result) => res.json({ status: "success", msg: result }))
    .catch((err) => res.json({ status: "error", msg: err }));
});

//update user
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .then((result) =>
      res.json({
        status: "success",
        msg: "User successfully updated",
        data: result,
      })
    )
    .catch((err) => res.json({ status: "error", msg: err }));
});

//delete user
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((result) =>
      res.json({ status: "success", msg: "User successfully deleted" })
    )
    .catch((err) => res.json({ status: "error", msg: err }));
});

module.exports = router;
