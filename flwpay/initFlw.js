const { default: axios } = require("axios");
const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(process.env.FLWPUBLICKEY, process.env.FLWSECRETKEY);
const currs = ["NGN", "GBP", "KES", "GHS"];
const countries = ["Nigeria", "UK", "Kenya", "Ghana"];

const getRealCur = (curr) => {
  return currs[curr];
};

const getCurFromCountry = (country) => {
  let index = countries.indexOf(country);
  return currs[index];
};

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

module.exports = { flw, makePayment, getFxRate, getRealCur, getCurFromCountry };
