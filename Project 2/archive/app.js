require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// DB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/archive");

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/archive",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 7 days
  })
);

// Make currentUser available in ALL views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// Routes
app.get("/", (req, res) => res.render("home"));
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

module.exports = app;