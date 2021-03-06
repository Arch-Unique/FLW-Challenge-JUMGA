const express = require("express");
const cors = require("cors");
let app = express();
app.use(cors());
app.options("*", cors());
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");
const shopRoute = require("./routes/shops");
const flwPaymentRoute = require("./flwpay/validatePayment");
const productPaymentRoute = require("./flwpay/productPayment");
const shopPaymentRoute = require("./flwpay/shopFeePayment");
const demoUser = require("./demo/demo_user");
const allItems = require("./routes/allitems");
const saleRoute = require("./routes/sales");

//get db connection
require("./config/connection");

const bodyParser = require("body-parser");

//Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Other routes
app.use("/api/users", userRoute);
app.use("/api/products/", productRoute);
app.use("/api/shops/", shopRoute);
app.use("/api/all/", allItems);
app.use("/api/flw/validatePayment/", flwPaymentRoute);
app.use("/api/flw/productPayment/", productPaymentRoute);
app.use("/api/flw/shopFeePayment/", shopPaymentRoute);
app.use("/api/demo/", demoUser);
app.use("/api/salesdb/", saleRoute);

// A simple base site call
app.use(express.static(__dirname + "/public"));

module.exports = app;
