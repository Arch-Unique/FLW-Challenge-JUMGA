const express = require("express");
const router = express.Router();
const Sale = require("../models/sale");

//create a sale entry
router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  const meta = body.data.meta[0];

  if (body.status == "success" && body.data.is_approved == 1) {
    Sale.create({
      jumga: meta.jumga,
      shop_owner: meta.shop_owner,
      dispatch_rider: meta.dispatch_rider,
      total_amount: meta.total_amount,
    })
      .then((result) => {
        console.log("transfer success");
      })
      .catch((err) => console.log(res));
  }
});

router.get("/", (req, res) => {
  Sale.find((err, docs) => {
    if (err) throw err;
    res.json({ status: "success", msg: docs });
  });
});

module.exports = router;
