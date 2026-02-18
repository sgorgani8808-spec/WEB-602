const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/simplekitchen")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Body parsing
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

// ✅ Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
