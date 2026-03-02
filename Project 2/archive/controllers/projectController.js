const { validationResult } = require("express-validator");
const Project = require("../models/Project");

exports.list = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  res.render("projects/list", { projects });
};

exports.detail = async (req, res) => {
  const project = await Project.findById(req.params.id).lean();
  if (!project) return res.status(404).send("Project not found");
  res.render("projects/detail", { project });
};

exports.getNew = (req, res) => {
  res.render("projects/new", { errors: [], values: {} });
};

exports.postNew = async (req, res) => {
  const errors = validationResult(req);
  const values = { ...req.body };

  if (!errors.isEmpty()) {
    return res.status(400).render("projects/new", { errors: errors.array(), values });
  }

  await Project.create({
    title: req.body.title,
    location: req.body.location,
    year: Number(req.body.year),
    category: req.body.category,
    materials: req.body.materials || "",
    description: req.body.description,
    createdBy: req.session.user.id
  });

  res.redirect("/projects");
};

exports.getEdit = async (req, res) => {
  const project = await Project.findById(req.params.id).lean();
  if (!project) return res.status(404).send("Project not found");
  res.render("projects/edit", { errors: [], values: project });
};

exports.putEdit = async (req, res) => {
  const errors = validationResult(req);
  const values = { ...req.body, _id: req.params.id };

  if (!errors.isEmpty()) {
    return res.status(400).render("projects/edit", { errors: errors.array(), values });
  }

  await Project.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    location: req.body.location,
    year: Number(req.body.year),
    category: req.body.category,
    materials: req.body.materials || "",
    description: req.body.description
  });

  res.redirect(`/projects/${req.params.id}`);
};

exports.delete = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect("/projects");
};