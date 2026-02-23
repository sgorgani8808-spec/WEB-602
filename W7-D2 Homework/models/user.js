// models/user.js
const mongoose = require("mongoose");

// IMPORTANT: depending on your install, this package may export as {default: fn}
// This line handles BOTH cases.
const plm = require("passport-local-mongoose");
const passportLocalMongoose = plm.default || plm;

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phone: String, // ✅ keep String because form input comes as text
});

// ✅ plugin MUST receive a function
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);