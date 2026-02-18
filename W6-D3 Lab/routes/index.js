const bcrypt = require("bcrypt");
const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const Registration = require("../models/Registration");


// Home Page
router.get("/", (req, res) => {
  res.render("index", { title: "Simple Kitchen" });
});


// Register Page
router.get("/register", (req, res) => {
  res.render("form", { title: "Registration form" });
});


// Thank You Page
router.get("/thank-you", (req, res) => {
  res.render("thank-you", { title: "Thank You" });
});


// Registrants / Admin Page
router.get("/registrants", async (req, res) => {
  try {
    const registrations = await Registration.find();

    res.render("registrations", {
      title: "Listing registrations",
      registrations,
      bodyClass: "registrants-body",
    });

  } catch (err) {
    console.log(err);
    res.send("Sorry! Something went wrong.");
  }
});


// Register Form POST
router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("Please enter a name"),
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("username").notEmpty().withMessage("Please enter a username"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("form", {
        title: "Registration form",
        errors: errors.array(),
        data: req.body,
      });
    }

    try {
      // Create registration from request body
      const registration = new Registration(req.body);

      // Generate salt
      const salt = await bcrypt.genSalt(10);

      // Hash password
      registration.password = await bcrypt.hash(
        registration.password,
        salt
      );

      // Save to database
      await registration.save();

      return res.redirect("/thank-you");

    } catch (err) {
      console.log(err);
      return res.send("Sorry! Something went wrong.");
    }
  }
);

module.exports = router;
