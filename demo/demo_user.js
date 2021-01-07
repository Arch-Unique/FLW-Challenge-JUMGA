const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Shop = require("../models/shop");

// const allUsers = [
//   {
//     name: "Arch",
//     email: "arch@gmail.com",
//     phone: "08034567890",
//     country: "Nigeria",
//     acct_no: "0690000031",
//     bank_name: "044",
//   },
//   {
//     name: "Baddo",
//     email: "baddo@gmail.com",
//     phone: "08034565860",
//     country: "Nigeria",
//     acct_no: "0690000033",
//     bank_name: "044",
//   },
//   {
//     name: "John",
//     email: "john@gmail.com",
//     phone: "08034567810",
//     country: "Nigeria",
//     acct_no: "0690000034",
//     bank_name: "044",
//   },
// ];

// const allDriders = [
//   {
//     name: "Sanches",
//     email: "sanchez@gmail.com",
//     phone: "08034567890",
//     country: "Nigeria",
//     acct_no: "0690000032",
//     bank_name: "044",
//   },
//   {
//     name: "Alexis",
//     email: "alexis@gmail.com",
//     phone: "08034565860",
//     country: "Nigeria",
//     acct_no: "0690000035",
//     bank_name: "044",
//   },
//   {
//     name: "Henry",
//     email: "henry@gmail.com",
//     phone: "08034567810",
//     country: "Nigeria",
//     acct_no: "0690000036",
//     bank_name: "044",
//   },
// ];

// router.get("/", (req, res) => {
//   allUsers.forEach((user) => {
//     User.create({
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       country: user.country,
//       bank_details: {
//         acc_no: user.acct_no,
//         bank_name: user.bank_name,
//       },
//       is_dispatch_rider: false,
//     })
//       .then((res) => {
//         console.log("User created successfully");
//       })
//       .catch((err) => {
//         res.status(400).json({ msg: err });
//       });
//   });
// });

// Sample user
router.get("/user", async (req, res) => {
  //res.status(200).json({ msg: "Hi test" });

  const name = "Arch";
  const email = "arch@gmail.com";
  const phone = "08034567890";
  const country = "Nigeria";
  const acct_no = "0690000031";
  const bank_name = "044";
  let users;

  users = await User.find();
  if (users.length != 0) {
    res.status(200).json({ msg: users[0]._id });
  } else {
    User.create({
      name: name,
      email: email,
      phone: phone,
      country: country,
      bank_details: {
        acc_no: acct_no,
        bank_name: bank_name,
      },
      is_dispatch_rider: false,
    })
      .then((resi) => {
        res.status(200).json({ msg: resi.id });
      })
      .catch((err) => {
        res.status(400).json({ msg: err });
      });
  }
});

// Sample Dispatch Rider
router.get("/rider", async (req, res) => {
  const name = "Sanchez";
  const email = "sanchez@gmail.com";
  const phone = "08054637291";
  const country = "Nigeria";
  const acct_no = "0690000032";
  const bank_name = "044";

  const users = await User.find();

  if (users[1] != null) {
    res.status(200).json({ msg: users[1].id });
  } else {
    User.create({
      name: name,
      email: email,
      phone: phone,
      country: country,
      bank_details: {
        acc_no: acct_no,
        bank_name: bank_name,
      },
      is_dispatch_rider: true,
    })
      .then((resi) => {
        res.status(200).json({ msg: resi.id });
      })
      .catch((err) => {
        res.status(400).json({ msg: err });
      });
  }
});

//sample shop
router.post("/shop", (req, res) => {
  let owner, drider;

  User.find(function (err, doc) {
    if (err) throw err;
    owner = doc[0];
    drider = doc[1];
  });

  req.body["dispatch_rider"] = drider;
  const shop = new Shop(req.body);

  owner.shops.push(shop);
  owner.save(function (err, user) {
    if (err) throw err;
    res.status(200).json({ msg: user.shops[0] });
  });
});

module.exports = router;
