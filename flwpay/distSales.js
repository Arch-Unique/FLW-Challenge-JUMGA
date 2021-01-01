const { productPercent, deliveryPercent } = require("../config/constants");
const Shop = require("../models/shop");
const flw = require("./initFlw").flw;

const distSales = async (amt, delFee, shopId) => {
  //get the respective prices for each party
  const sellerGains = (100 - productPercent) * amt;
  const riderGains = (100 - deliveryPercent) * delFee;
  let msg = "Failure";

  //get shop details
  Shop.findById(shopId).then((shop) => {
    const rider = shop.dispatch_rider;
    const seller = shop.owner;
    const riderTxnType = getTrxType(rider, riderGains);
    const sellerTxnType = getTrxType(seller, sellerGains);
    const data = {
      title: "Sales Payment",
      bulk_data: [riderTxnType, sellerTxnType],
    };

    const res = await flw.Transfer.bulk(data);
    msg = res.data.status;

  });

  return msg;
};

//available to GBP,NGN,GHS
const bankTransfer = (user, amt) => {
  let defOpt = {
    amount: amt,
    narration: "Payment Sales Transfer Share",
    currency: user.country,
    reference: "akhlm-pstmnpyt-rfxx007_PMCKDU_1",
    callback_url: "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
  };

  if (user.country != "GBP") {
    defOpt["account_bank"] = user.bank_details.bank_name;
    defOpt["account_number"] = user.bank_details.acct_no;
  }

  if (user.country != "NGN") {
    defOpt["beneficiary_name"] = user.name;
  }

  if (user.country == "GHS") {
    defOpt["destination_branch_code"] = user.bank_details.branch_code;
  }

  if (user.country == "GBP") {
    defOpt["meta"] = [
      {
        AccountNumber: user.bank_details.acct_no,
        RoutingNumber: user.bank_details.routing_no,
        SwiftCode: user.bank_details.swift_code,
        BankName: user.bank_details.acct_no,
        BeneficiaryName: user.name,
        BeneficiaryCountry: "DE",
        PostalCode: user.address.postal_code,
        StreetNumber: user.address.street_number,
        StreetName: user.address.street_name,
        City: user.address.city,
      },
    ];
  }

  return defOpt;
};

//available for GHS, KES
const mobileMoney = (user, amt) => {
  return {
    account_bank: user.momo.name,
    account_number: user.momo.phone,
    amount: amt,
    narration: "New GHS momo transfer",
    currency: user.country,
    reference: "new-ghs-momo-transfer",
    beneficiary_name: user.name,
  };
};

//get transaction type
const getTrxType = (user, amt) => {
  return user.txType == 1 ? bankTransfer(user, amt) : mobileMoney(user, amt);
};

module.exports = distSales;
