const dbUrl = "mongodb://localhost/jumga";
const url = require("url");

const getUrl = (req) => {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });
};

const productPercent = 2.5;
const deliveryPercent = 20;
const approvalFee = 20;

module.exports = {
  dbUrl,
  productPercent,
  deliveryPercent,
  approvalFee,
  getUrl,
};
