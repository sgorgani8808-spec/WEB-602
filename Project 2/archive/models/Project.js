const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    location: { type: String, required: true, trim: true, maxlength: 120 },
    year: { type: Number, required: true, min: 1800, max: 2100 },
    category: { type: String, required: true, trim: true, maxlength: 60 },
    materials: { type: String, trim: true, maxlength: 240 },
    description: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);