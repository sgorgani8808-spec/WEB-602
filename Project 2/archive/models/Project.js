const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    materials: { type: String },
    description: { type: String, required: true },
    images: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);