let axios = require("axios").default;
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const txRef = req.query.tx_ref;
  const txId = req.query.transaction_id;
  const txStatus = req.query.status;
  const opt = {
    method: "GET",
    url: "https://api.flutterwave.com/v3/transactions/" + txId + "/verify",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer {{" + process.env.FLWSECRETKEY + "}}",
    },
  };

  if (txStatus == "successful") {
    axios
      .request(opt)
      .then((result) => {
        const resBody = result.body;
        if (resBody.status == "success" && txRef == resBody.tx_ref) {
          res.status(200).json({ msg: "Transaction Successful" });
        }
      })
      .catch((err) => {
        res.status(404).json({ msg: "Transaction Failed" });
      });
  } else {
    res.status(404).json({ msg: "Transaction Failed" });
  }
});
