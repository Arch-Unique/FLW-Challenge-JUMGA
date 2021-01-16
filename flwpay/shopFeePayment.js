const express = require("express");
const shopFee = require("../config/constants").approvalFee;
const User = require("../models/user");
const router = express.Router();
const { makePayment, getFxRate, getRealCur, hostname } = require("./initFlw");
const demoShopDesc = "A very good shop where we sell food items and provisions";

router.get("/:userId&:currency", async (req, res) => {
  const cur = req.params.currency; //integer
  const userId = req.params.userId;

  try {
    let user = await User.findById(userId);
    const name = user.name;
    const email = user.email;
    const phone = user.phone;
    const amt = await getFxRate(shopFee, cur);
    const currency = getRealCur(cur);

    let userData = {
      tx_ref: "shop" + name + Date.now(),
      amount: amt,
      currency: currency,
      redirect_url: hostname + process.env.PORT + "/api/flw/validatePayment",
      //payment_options: "card",
      meta: {
        payment_type: "shop",
        title: name,
        desc: demoShopDesc,
      },
      customer: {
        email: email,
        phonenumber: phone,
        name: name,
      },
      customizations: {
        title: "Shop Approval Fee",
        logo: hostname + process.env.PORT + "/images/jlogo.png",
      },
    };

    let result = await makePayment(userData);
    console.log("msg ---" + result);
    res.json({ status: result != null ? "success" : "error", msg: result });
  } catch (error) {
    res.json({ status: "error", msg: error });
    console.log(error);
  }
});

module.exports = router;
