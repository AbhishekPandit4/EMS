const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authKey = process.env.JWT_KEY;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Hashing the password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Generate auth token
UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, authKey, { expiresIn: '2h' });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

const UserModel = mongoose.model("empAuth", UserSchema);

module.exports = UserModel;
