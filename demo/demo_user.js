const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Shop = require("../models/shop");
const Product = require("../models/product");
const faker = require("faker");

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

  req.body["dispatch_rider"] = drider.id;
  const shop = new Shop(req.body);

  owner.shops.push(shop);
  owner.save(function (err, user) {
    if (err) throw err;
    res.status(200).json({ msg: user.shops[0] });
  });
});

//demo
router.get("/", async (req, res) => {
  let users;

  users = await User.find();
  const countries = ["Nigeria", "UK", "Kenya", "Ghana"];
  if (users.length != 0) {
    res.status(200).json({ msg: users[0] });
  } else {
    try {
      for (let i = 0; i < 8; i++) {
        await User.create({
          name: faker.name.firstName(i % 2),
          email: faker.internet.email(i % 2),
          phone: faker.phone.phoneNumber(),
          country: countries[i % 4],
          is_dispatch_rider: i > 3,
        });
      }

      let users = await User.find();
      for (let j = 1; j < 4; j++) {
        const user = users[j];
        let shop = await Shop.create({
          owner: user.id,
          dispatch_rider: users[j + 4].id,
          name: faker.name.lastName(j % 2),
          description: faker.internet.userName(),
          is_approved: true,
        });

        const products = ["T-Shirt", "BasketBall", "Game"];
        for (let k = 0; k < 3; k++) {
          let img = "images/" + products[k].toLowerCase() + ".png";
          let product = await Product.create({
            name: products[k],
            description: faker.commerce.productDescription(),
            images: img,
            price: (k + 1) * 10 * (faker.random.number(5) + 1),
            quantity: faker.random.number(500),
          });
          shop.products.push(product);
        }
        user.shops.push(shop);
        await user.save;
      }

      let products = await Product.find();
      res.status(200).json({ msg: users[0], products: products });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
