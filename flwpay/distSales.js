/*
This is for distribution of profits to the different parties
*/

const { productPercent, deliveryPercent } = require("../config/constants");
const { getCurFromCountry, flw } = require("./initFlw");
const Shop = require("../models/shop");

const distSales = async (amt, delFee, shopId) => {
  //get the respective prices for each party
  const sellerGains = ((100 - productPercent) * amt) / 100;
  const riderGains = ((100 - deliveryPercent) * delFee) / 100;
  let msg = "Failure";

  try {
    let shop = await Shop.findById(shopId)
      .populate("dispatch_rider")
      .populate("owner")
      .exec();
    const rider = shop.dispatch_rider;
    const seller = shop.owner;
    const riderTxnType = getTrxType(rider, riderGains);
    const sellerTxnType = getTrxType(seller, sellerGains);
    const data = {
      title: "Sales Payment",
      bulk_data: [riderTxnType, sellerTxnType],
    };

    const res = await flw.Transfer.bulk(data);
    console.log(res);
    msg = res.status;
    const meta = {
      status: msg,
      jumga: amt - (riderGains + sellerGains - delFee),
      shop_owner: sellerGains,
      dispatch_rider: riderGains,
      total: amt,
    };
    return meta;
  } catch (error) {}
  return { status: "error" };
};

//available to GBP,NGN,GHS
const bankTransfer = (user, amt) => {
  let defOpt = {
    amount: amt,
    narration: "Payment Sales Transfer Share",
    currency: getCurFromCountry(user.country),
    reference: `SalesDistrx-${user.name}-${Date.now()}`,
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
        BankName: user.bank_details.bank_name,
        BeneficiaryName: user.name,
        BeneficiaryCountry: "GB",
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
    narration: "Payment Sales Transfer Share",
    currency: getCurFromCountry(user.country),
    reference: `SalesDistrx-${user.name}-${Date.now()}`,
    beneficiary_name: user.name,
  };
};

//get transaction type
const getTrxType = (user, amt) => {
  if (user.country == "Nigeria" || user.country == "UK") {
    return bankTransfer(user, amt);
  } else {
    return mobileMoney(user, amt);
  }
};

module.exports = distSales;
