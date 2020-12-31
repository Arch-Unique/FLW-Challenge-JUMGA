const mongoose = require("mongoose");
const constants = require("./constants");

mongoose.connect(
  constants.dbUrl,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) throw err;
    console.log("Successfully connected");
  }
);
