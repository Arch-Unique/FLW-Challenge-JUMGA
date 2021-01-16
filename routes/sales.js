const express = require("express");
const router = express.Router();
const Sale = require("../models/sale");

//create a sale entry
router.post("/", (req, res) => {
  const meta = req.body;

  if (meta.status == "success") {
    Sale.create({
      jumga: meta.jumga,
      shop_owner: meta.shop_owner,
      dispatch_rider: meta.dispatch_rider,
      total_amount: meta.total,
    })
      .then((result) => {
        res.json({ status: "success" });
      })
      .catch((err) => res.json({ status: "error" }));
  }
});

//get all sales entry
router.get("/", (req, res) => {
  Sale.find((err, docs) => {
    if (err) throw err;
    res.json({ status: "success", msg: docs });
  });
});

module.exports = router;
