const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.getSignup = (req, res) => res.render("auth/signup", { errors: [], values: {} });

exports.postSignup = async (req, res) => {
  const errors = validationResult(req);
  const values = { name: req.body.name, email: req.body.email };

  if (!errors.isEmpty()) {
    return res.status(400).render("auth/signup", { errors: errors.array(), values });
  }

  const existing = await User.findOne({ email: req.body.email.toLowerCase() });
  if (existing) {
    return res.status(400).render("auth/signup", {
      errors: [{ msg: "Email already in use." }],
      values
    });
  }

  const passwordHash = await bcrypt.hash(req.body.password, 12);

  // Optional: make first user admin if you want
  const count = await User.countDocuments();
  const role = count === 0 ? "admin" : "user";

  const user = await User.create({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    passwordHash,
    role
  });

  req.session.user = { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
  res.redirect("/projects");
};

exports.getLogin = (req, res) => res.render("auth/login", { errors: [], values: {} });

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);
  const values = { email: req.body.email };

  if (!errors.isEmpty()) {
    return res.status(400).render("auth/login", { errors: errors.array(), values });
  }

  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!user) {
    return res.status(400).render("auth/login", {
      errors: [{ msg: "Invalid email or password." }],
      values
    });
  }

  const ok = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!ok) {
    return res.status(400).render("auth/login", {
      errors: [{ msg: "Invalid email or password." }],
      values
    });
  }

  req.session.user = { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
  res.redirect("/projects");
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};