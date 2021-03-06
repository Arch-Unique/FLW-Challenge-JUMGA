const express = require("express");
const Product = require("../models/product");
const User = require("../models/user");
const router = express.Router();
const { makePayment, getFxRate, getRealCur, hostname } = require("./initFlw");

router.post("/", async (req, res) => {
  const cur = req.body.currency; //integer
  const userId = req.body.userId;
  const productId = req.body.productId;

  try {
    let user = await User.findById(userId);
    const name = user.name;
    const email = user.email;
    const phone = user.phone;

    let product = await Product.findById(productId).populate({
      path: "shopOwner",
    });

    const productName = product.name;
    const productPrice = product.price;
    const shopId = product.shopOwner[0]._id;
    let amt = await getFxRate(productPrice, cur);
    // dfee - delivery fee constant $10
    let dfee = await getFxRate(10, cur);
    amt += dfee;

    let userData = {
      tx_ref: `product-${name}-${productId}-${Date.now()}`,
      amount: amt,
      currency: getRealCur(cur),
      redirect_url: hostname + process.env.PORT + "/api/flw/validatePayment",
      //payment_options: "card",
      meta: {
        payment_type: "product",
        delfee: dfee,
        shopid: shopId,
      },
      customer: {
        email: email,
        phonenumber: phone,
        name: name,
      },
      customizations: {
        title: productName,
        logo: hostname + process.env.PORT + "/images/jlogo.png",
      },
    };

    let result = await makePayment(userData);
    res.json({ status: result != null ? "success" : "error", msg: result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", msg: error });
  }
});

module.exports = router;
