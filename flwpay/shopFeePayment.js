const express = require("express");
const shopFee = require("../config/constants").approvalFee;
const User = require("../models/user");
const router = express.Router();
const convs = require("./convertCur");
const makePayment = require("./initFlw").makePayment;
const demoShopTitle = "Arch Shop";
const demoShopDesc = "A very good shop where we sell food items and provisions";

router.get("/:userId&:currency", async (req, res) => {
  const cur = req.params.currency; //integer
  const userId = req.params.userId;

  try {
    let user = await User.findById(userId);
    const name = user.name;
    const email = user.email;
    const phone = user.phone;
    const amt = await convs.convCur(shopFee, cur);
    const currency = convs.getRealCur(cur);

    let userData = {
      tx_ref: "JUMGAShopFee" + name + Date.now(),
      amount: amt,
      currency: currency,
      redirect_url:
        "http://localhost:" + process.env.PORT + "/api/flw/validatePayment",
      //payment_options: "card",
      meta: {
        payment_type: "shop",
        title: demoShopTitle,
        desc: demoShopDesc,
      },
      customer: {
        email: email,
        phonenumber: phone,
        name: name,
      },
      customizations: {
        title: "Shop Approval Fee",
        logo: __dirname + "/public/images/logo.png",
      },
    };

    let result = await makePayment(userData);
    console.log("msg ---" + result);
    res.status(result != null ? 200 : 400).json({ msg: result });
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
});

module.exports = router;
