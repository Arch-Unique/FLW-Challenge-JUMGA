const { default: axios } = require("axios");
const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(process.env.FLWPUBLICKEY, process.env.FLWSECRETKEY);
const currs = ["NGN", "GBP", "KES", "GHS"];
const countries = ["Nigeria", "UK", "Kenya", "Ghana"];
const hostname = "https://jumga-arch.herokuapp.com:"; //replace with your's

//get real currency from integer
const getRealCur = (curr) => {
  return currs[curr];
};

//get real currency from string country
const getCurFromCountry = (country) => {
  let index = countries.indexOf(country);
  return currs[index];
};

//make any payment using this
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
    return res.data.status == "success" ? res.data.data.link : null;
  } catch (err) {
    console.log("flwerr---" + err);
    return null;
  }
};

//get FX rate and convert the amount accordingly
const getFxRate = async (amt, cur) => {
  const opt = {
    method: "get",
    url: "https://api.flutterwave.com/v3/rates",
    headers: {
      Authorization: `Bearer ${process.env.FLWSECRETKEY}`,
      "Content-Type": "application/json",
    },
    params: {
      from: "USD",
      to: getRealCur(cur),
      amount: amt,
    },
  };

  try {
    let res = await axios(opt);
    let newamt = res.data.data.to.amount;
    return newamt;
  } catch (error) {}
};

module.exports = {
  flw,
  makePayment,
  getFxRate,
  getRealCur,
  getCurFromCountry,
  hostname,
};
