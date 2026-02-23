// app.js
const express = require("express");
const expSession = require("express-session");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");

const app = express();

// ✅ Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/auth_demo");

// ✅ Middleware
app.set("view engine", "ejs");

// Helmet (sets secure HTTP headers)
app.use(helmet());

// Preventing DOS Attacks — Limit Payload Size
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(express.static("public"));

// OWASP: NoSQL Injection Protection
app.use(mongoSanitize());

// XSS Protection
app.use(xss());

// OWASP: Rate Limiting (Brute Force Protection)
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,                 // max 100 requests per hour
  message: "Too many requests. Please try again later."
});

app.use(expSession({
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,   // <-- change to true per slide
  cookie: {
    httpOnly: true,
    secure: false,           // ⚠ keep FALSE for localhost
    maxAge: 1 * 60 * 1000    // 10 minutes
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Passport config (passport-local-mongoose gives these helpers)
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Routes
app.get("/", (req, res) => res.render("home"));

app.get("/userprofile", (req, res) => res.render("userprofile"));

app.get("/login", (req, res) => res.render("login"));

app.post(
  "/login",
  loginLimiter,  // 👈 ADD THIS
  passport.authenticate("local", {
    successRedirect: "/userprofile",
    failureRedirect: "/login"
  })
);

app.get("/register", (req, res) => res.render("register"));

/**
 * ✅ Register behavior per your homework:
 * - If success -> redirect to /login
 * - If username exists -> show message on register page
 */
app.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("REGISTER ERROR:", err);

      // Username already exists
      if (err.name === "UserExistsError") {
        return res.status(400).render("register", {
          error: "That username already exists. Please pick another.",
        });
      }

      return res.status(400).render("register", {
        error: "Registration failed. Please try again.",
      });
    }

    // ✅ Success -> go to login page
    return res.redirect("/login");
  });
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

// ✅ Listen
app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.log(err);
  else console.log("Server Started At Port 3000");
});

module.exports = app; // (optional but nice for testing)