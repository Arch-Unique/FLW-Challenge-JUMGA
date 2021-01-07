const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator").default;
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (text) {
          return validator.isEmail(text);
        },
        message: "Invalid Email",
      },
    },
    phone: String,
    // password: {
    //   type: String,
    //   required: true,
    // },
    country: String,
    bank_details: {
      acc_no: String,
      bank_name: String,
      branch_code: Number,
      swift_code: String,
      routing_no: String,
    },
    address: {
      postal_code: String,
      street_number: String,
      street_name: String,
      city: String,
    },
    momo: {
      name: String,
      phone: String,
    },
    is_dispatch_rider: {
      type: Boolean,
      default: false,
    },
    shops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//PASSWORD FEATURE

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) {
//     return next(null);
//   }
//   bcrypt.hash(this.password, 10, (err, passwordHash) => {
//     if (err) {
//       return next(err);
//     }
//     this.password = passwordHash;
//     next();
//   });
// });

// userSchema.methods.checkPass = function (password, cb) {
//   bcrypt.compare(password, this.password, (err, isMatch) => {
//     if (err) {
//       return cb(err);
//     } else {
//       return isMatch ? cb(null, this) : cb(null, isMatch);
//     }
//   });
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
