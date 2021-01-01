const express = require("express");
let app = express();
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");
const shopRoute = require("./routes/shops");
const flwPaymentRoute = require("./flwpay/validatePayment");

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
app.use("/api/flw/validatePayment/", flwPaymentRoute);

// A simple get
app.use(express.static(__dirname + "/public"));

module.exports = app;
