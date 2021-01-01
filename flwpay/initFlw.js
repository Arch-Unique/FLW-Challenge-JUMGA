const { default: axios } = require("axios");
const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(process.env.FLWPUBLICKEY, process.env.FLWSECRETKEY);

const makePayment = async (payload) => {
  const opt = {
    method: "post",
    url: "https://api.flutterwave.com/v3/payments",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer {{" + process.env.FLWSECRETKEY + "}}",
    },
    data: payload,
  };
  try {
    const res = await axios(opt);
    return res.body.status == "success" ? res.body.data.link : null;
  } catch (err) {
    return err;
  }
};

module.exports = { flw, makePayment };
