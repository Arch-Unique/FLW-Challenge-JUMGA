const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const { flw, hostname } = require("./initFlw");
const distSales = require("./distSales");

router.get("/", async (req, res) => {
  const demoShopURL = hostname + process.env.PORT + "/api/demo/shop";
  const trxURL = hostname + process.env.PORT + "/transaction.html";
  const salesURL = hostname + process.env.PORT + "/api/salesdb/";
  const txRef = req.query.tx_ref;
  const txId = req.query.transaction_id;
  const txStatus = req.query.status;
  const payload = { id: txId };

  let finalRedUrlSuc = trxURL + "?msg=success";
  let finalRedUrlErr = trxURL + "?msg=failed";

  if (txStatus == "successful") {
    const response = await flw.Transaction.verify(payload);
    const data = response.data;
    if (response.status == "success" && txRef == data.tx_ref) {
      if (data.meta.payment_type == "shop") {
        let result = await axios.post(demoShopURL, {
          name: data.meta.title,
          description: data.meta.desc,
          is_approved: true,
        });
        if (result.status == 200) {
          res.redirect(finalRedUrlSuc);
        } else {
          res.redirect(finalRedUrlErr);
        }
      } else {
        //do something here for the payment
        let result = await distSales(
          data.amount,
          data.meta.delfee,
          data.meta.shopid
        );
        if (result.status == "success") {
          let sRes = await axios.post(salesURL, result);
          if (sRes.status == "success") {
            res.redirect(finalRedUrlSuc);
          } else {
            res.redirect(finalRedUrlErr);
          }
        } else {
          res.redirect(finalRedUrlErr);
        }
      }
    } else {
      res.redirect(finalRedUrlErr);
    }
  } else {
    res.redirect(finalRedUrlErr);
  }
});

module.exports = router;
