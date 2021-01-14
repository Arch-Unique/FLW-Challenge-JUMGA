const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Shop = require("../models/shop");
const Product = require("../models/product");
const faker = require("faker");

// Sample user
router.get("/user", async (req, res) => {
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
        acct_no: acct_no,
        bank_name: bank_name,
      },
      is_dispatch_rider: false,
    })
      .then((resi) => {
        res.json({ status: "success", msg: resi.id });
      })
      .catch((err) => {
        res.json({ status: "success", msg: err });
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
        acct_no: acct_no,
        bank_name: bank_name,
      },
      is_dispatch_rider: true,
    })
      .then((resi) => {
        res.json({ status: "success", msg: resi.id });
      })
      .catch((err) => {
        res.json({ status: "error", msg: err });
      });
  }
});

//sample shop
router.post("/shop", (req, res) => {
  User.find(function (err, doc) {
    if (err) throw err;
    let owner = doc[0];
    let drider = doc[4];

    console.log(drider);
    console.log(owner);

    req.body["dispatch_rider"] = drider.id;
    const shop = new Shop(req.body);

    owner.shops.push(shop);
    owner.save(function (err, user) {
      if (err) {
        res.json({ status: "error", msg: err });
      }
      res.json({ status: "success", msg: user.shops[0] });
    });
  });
});

router.get("/check", async (req, res) => {
  try {
    let users = await User.find();
    res.json({ status: "success", msg: users.length == 0 ? 0 : 1 });
  } catch (error) {}
});

//demo
router.get("/demo/:country", async (req, res) => {
  const countries = ["Nigeria", "UK", "Kenya", "Ghana"];
  const cid = req.params.country;

  let users = await User.find();
  if (users.length != 0) {
    let products = await Product.find();
    res.json({ status: "success", msg: users[0], products: products });
  } else {
    [countries[0], countries[cid]] = [countries[cid], countries[0]];
    try {
      for (let i = 0; i < 8; i++) {
        let defOpt = {
          name: faker.name.firstName(i % 2),
          email: faker.internet.email(i % 2),
          phone: faker.phone.phoneNumber(),
          country: countries[i % 4],
          is_dispatch_rider: i > 3,
        };
        let demoUser = getDemoUser(defOpt);
        await User.create(demoUser);
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
          shop.products.push(product._id);
        }
        await shop.save();
        user.shops.push(shop._id);
        await user.save();
      }

      let products = await Product.find();
      res.json({ status: "success", msg: users[0], products: products });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", msg: error });
    }
  }
});

function demoNGN(user) {
  user["bank_details"] = {
    acct_no: "0690000032",
    bank_name: "044",
  };
  return user;
}

function demoKES(user) {
  user["momo"] = {
    name: "MPS",
    phone: "2540782773934",
  };
  return user;
}

function demoGHS(user) {
  user["bank_details"] = {
    acct_no: "0031625807099",
    bank_name: "GH280100",
    branch_code: "GH280103",
  };
  user["momo"] = {
    name: "MTN",
    phone: "233542773934",
  };
  return user;
}

function demoGBP(user) {
  user["bank_details"] = {
    acct_no: "DA091983888373BGH",
    bank_name: "LLOYDS BANK",
    swift_code: "BECFDE7HKKX",
    routing_no: "BECFDE7HKKX",
  };
  user["address"] = {
    postal_code: "80489",
    street_name: "London Street",
    street_no: "21",
    city: "London",
  };
  return user;
}

function getDemoUser(user) {
  switch (user.country) {
    case "Nigeria":
      return demoNGN(user);
    case "Ghana":
      return demoGHS(user);
    case "Kenya":
      return demoKES(user);
    case "UK":
      return demoGBP(user);

    default:
      break;
  }
}

module.exports = router;
