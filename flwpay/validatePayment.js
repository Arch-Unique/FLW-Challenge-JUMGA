const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const flw = require("./initFlw").flw;
const distSales = require("./distSales");

router.post("/", async (req, res) => {
  const txRef = req.query.tx_ref;
  const txId = req.query.transaction_id;
  const txStatus = req.query.status;
  const payload = { id: txId };

  if (txStatus == "successful") {
    const response = await flw.Transaction.verify(payload);
    const data = response.data;
    if (response.status == "success" && txRef == data.tx_ref) {
      if (data.meta.payment_type == "shop") {
        axios
          .post("", {
            name: data.meta.title,
            description: data.meta.desc,
            is_approved: true,
          })
          .then((result) => {
            if (result.status == 200) {
              res.status(200).json({ msg: result.data.msg });
            }
          })
          .catch((err) => {
            res.status(400).json({ msg: err });
          });
      } else {
        //do something here for the payment
        distSales(data.amount, data.meta.delfee, data.meta.shopid).then(
          (res) => {
            if (res == "success") {
              res.status(200).json({ msg: "Transaction Successful" });
            } else {
              res.status(400).json({ msg: "Transaction Failed" });
            }
          }
        );
      }
    } else {
      res.status(404).json({ msg: "Transaction Failed" });
    }
  } else {
    res.status(404).json({ msg: "Transaction Failed" });
  }
});

module.exports = router;
