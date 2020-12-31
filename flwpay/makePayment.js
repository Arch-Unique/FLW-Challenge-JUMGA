const axios = require("axios").default;
const express = require("express");
const Product = require("../models/product");
const User = require("../models/user");
const router = express.Router();
const convs = require("./convertCur");

const opt = {
  method: "post",
  url: "https://api.flutterwave.com/v3/payments",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer {{" + process.env.FLWSECRETKEY + "}}",
  },
};

router.post("/", (res, req) => {
  const cur = req.body.currency; //integer
  const userId = req.body.userId;
  const productId = req.body.productId;

  User.findById(userId)
    .then((user) => {
      const name = user.name;
      const email = user.email;
      const phone = user.phone;

      Product.findById(productId)
        .then((product) => {
          const productName = product.title;
          const productPrice = product.amount;

          let userData = {
            tx_ref: "hooli-tx-1920bbtytty",
            amount: convs.convCur(productPrice, cur),
            currency: convs.getRealCur(cur),
            redirect_url: "./validatePayment.js",
            //payment_options: "card",
            meta: {
              consumer_id: 23,
              consumer_mac: "92a3-912ba-1192a",
            },
            customer: {
              email: email,
              phonenumber: phone,
              name: name,
            },
            customizations: {
              title: productName,
              logo: __dirname + "/public/images/logo.png",
            },
          };

          axios
            .post(url, userData, opt)
            .then(function (result) {
              if (result.body.status == "success") {
                res.status(200).json({ msg: result.body.data.link });
              }
            })
            .catch(function (err) {});
        })
        .catch((err) => res.status(400).json({ msg: err }));
    })
    .catch((err) => res.status(400).json({ msg: err }));
});
