const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const flw = require("./initFlw").flw;
const distSales = require("./distSales");
const demoShopURL = "http://localhost:" + process.env.PORT + "/api/demo/shop";

router.get("/", async (req, res) => {
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
          .post(demoShopURL, {
            name: data.meta.title,
            description: data.meta.desc,
            is_approved: true,
          })
          .then((result) => {
            if (result.status == 200) {
              res.redirect(
                "http://localhost:" +
                  process.env.PORT +
                  "/profile.html?msg=Success"
              );
            }
          })
          .catch((err) => {
            res.redirect(
              "http://localhost:" +
                process.env.PORT +
                "/profile.html?msg=Failed"
            );
          });
      } else {
        //do something here for the payment
        distSales(data.amount, data.meta.delfee, data.meta.shopid).then(
          (result) => {
            if (result == "success") {
              res.redirect(
                "http://localhost:" +
                  process.env.PORT +
                  "/product.html?msg=Success"
              );
            } else {
              res.redirect(
                "http://localhost:" +
                  process.env.PORT +
                  "/product.html?msg=Failed"
              );
            }
          }
        );
      }
    } else {
      res.redirect(
        "http://localhost:" + process.env.PORT + "/profile.html?msg=Failed"
      );
    }
  } else {
    res.redirect(
      "http://localhost:" + process.env.PORT + "/profile.html?msg=Failed"
    );
  }
});

module.exports = router;
