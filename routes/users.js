const express = require("express");
const Shop = require("../models/shop");
const router = express.Router();
const User = require("../models/user");

//create user
router.post("/", (req, res) => {
  const body = req.body;
  User.create(body)
    .then((result) => {
      res.status(200).json({ msg: "User successfully created" });
    })
    .catch((err) => res.status(400).json({ msg: err }));
});

//get user
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  User.findById(id)
    .then((result) => res.status(200).json({ msg: result }))
    .catch((err) => res.status(400).json({ msg: err }));
});

//update user
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .then((result) =>
      res.status(200).json({ msg: "User successfully updated" })
    )
    .catch((err) => res.status(400).json({ msg: err }));
});

//delete user
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((result) =>
      res.status(200).json({ msg: "User successfully deleted" })
    )
    .catch((err) => res.status(400).json({ msg: err }));
});

module.exports = router;
