const express = require("express");
const Product = require("../models/product");
const User = require("../models/user");
const router = express.Router();
const convs = require("./convertCur");
const makePayment = require("./initFlw").makePayment;

router.post("/", async (res, req) => {
  const cur = req.body.currency; //integer
  const userId = req.body.userId;
  const productId = req.body.productId;
  const shopId = req.body.shopId;

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
            redirect_url: "http://localhost:"+ process.env.PORT + "/api/flw/validatePayment",
        //payment_options: "card",
        meta: {
          payment_type: "product",
          delfee: 2000,
          shopid: shopId,
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

          const msg = await makePayment(userData);
          if(msg != null){
            res.status(200).json({ msg: result.body.data.link });
          }else{
            res.status(400).json({ msg: msg });
          }
        })
        .catch((err) => res.status(400).json({ msg: err }));
    })
    .catch((err) => res.status(400).json({ msg: err }));
});

module.exports = router;