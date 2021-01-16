const dbUrl = "mongodb://localhost/jumga";
const url = require("url");

const getUrl = (req) => {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });
};

const productPercent = 2.5; //Percentage JUMGA takes for every sale
const deliveryPercent = 20; //Percentage JUMGA takes for every delivery
const approvalFee = 20; //Approval fee in dollars

module.exports = {
  dbUrl,
  productPercent,
  deliveryPercent,
  approvalFee,
  getUrl,
};
