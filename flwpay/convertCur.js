const axios = require("axios").default;
const currs = ["NGN", "GBP", "KES", "GHS"];

const getRealCur = (curr) => {
  return currs[curr];
};

const convCur = async (amt, curr) => {
  let newamt = 0;
  const url =
    "http://data.fixer.io/api/latest?access_key=ceaca4f749a06b103499d7cc1c1f050d&symbols=USD," +
    getRealCur(curr) +
    "&format=1";

  try {
    let res = await axios.get(url);
    const pairs = Object.values(res.data.rates);
    const usd = pairs[0];
    newamt = pairs[1] * (amt / usd);
    return newamt;
  } catch (error) {}
};

module.exports = { convCur, getRealCur };
