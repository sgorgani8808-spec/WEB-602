const express = require("express");
const { body } = require("express-validator");
const auth = require("../controllers/authController");

const router = express.Router();

router.get("/signup", auth.getSignup);
router.post(
  "/signup",
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters."),
  body("email").isEmail().withMessage("Enter a valid email."),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
  auth.postSignup
);

router.get("/login", auth.getLogin);
router.post(
  "/login",
  body("email").isEmail().withMessage("Enter a valid email."),
  body("password").notEmpty().withMessage("Password is required."),
  auth.postLogin
);

router.post("/logout", auth.logout);

module.exports = router;