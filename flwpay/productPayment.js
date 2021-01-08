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
            tx_ref: `${name}-${productId}-${Date.now()}`,
            amount: convs.convCur(productPrice, cur),
            currency: convs.getRealCur(cur),
            redirect_url:
              "http://localhost:" +
              process.env.PORT +
              "/api/flw/validatePayment",
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
              logo:
                "http://localhost:" +
                process.env.PORT +
                "/public/images/logo.png",
            },
          };

          makePayment(userData)
            .then((msg) => {
              res.json({ status: "success", msg: msg });
            })
            .catch((err) => {
              res.json({ status: "error", msg: err });
            });
        })
        .catch((err) => res.json({ status: "error", msg: err }));
    })
    .catch((err) => res.json({ status: "error", msg: err }));
});

module.exports = router;
