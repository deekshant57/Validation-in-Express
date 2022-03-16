const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // first_name, last_name, email, pincode, age, gender,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pincode: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Others"] },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
