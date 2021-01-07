const { default: axios } = require("axios");
const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(process.env.FLWPUBLICKEY, process.env.FLWSECRETKEY);

const makePayment = async (payload) => {
  const opt = {
    method: "post",
    url: "https://api.flutterwave.com/v3/payments",
    headers: {
      Authorization: `Bearer ${process.env.FLWSECRETKEY}`,
      "Content-Type": "application/json",
    },
    data: payload,
  };

  try {
    const res = await axios(opt);
    console.log("res---" + res.data);
    return res.data.status == "success" ? res.data.data.link : null;
  } catch (err) {
    console.log("flwerr---" + err);
    return null;
  }
};

module.exports = { flw, makePayment };
