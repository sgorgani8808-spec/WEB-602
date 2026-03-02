const { validationResult } = require("express-validator");
const Project = require("../models/Project");

// GET /projects
exports.list = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.render("projects/list", { projects, currentUser: req.session.user });
};

// GET /projects/new
exports.getNew = (req, res) => {
  res.render("projects/new", { errors: [], values: {}, currentUser: req.session.user });
};

// POST /projects
exports.postNew = async (req, res) => {
  const errors = validationResult(req);

  const values = {
    title: req.body.title,
    location: req.body.location,
    year: req.body.year,
    category: req.body.category,
    materials: req.body.materials,
    description: req.body.description,
  };

  if (!errors.isEmpty()) {
    return res.status(400).render("projects/new", {
      errors: errors.array(),
      values,
      currentUser: req.session.user,
    });
  }

  const imagePaths = (req.files || []).map((f) => `/uploads/${f.filename}`);

  const project = await Project.create({
    ...values,
    year: parseInt(req.body.year, 10),
    images: imagePaths,
    createdBy: req.session.user.id, // ✅ session uses "id"
  });

  res.redirect(`/projects/${project._id}`);
};

// GET /projects/:id
exports.detail = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send("Project not found");
  res.render("projects/detail", { project, currentUser: req.session.user });
};

// GET /projects/:id/edit
exports.getEdit = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send("Project not found");
  res.render("projects/edit", { errors: [], values: project, project, currentUser: req.session.user });
};

// PUT /projects/:id
exports.putEdit = async (req, res) => {
  const errors = validationResult(req);
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send("Project not found");

  const values = {
    _id: project._id,
    title: req.body.title,
    location: req.body.location,
    year: req.body.year,
    category: req.body.category,
    materials: req.body.materials,
    description: req.body.description,
    images: project.images || [],
  };

  if (!errors.isEmpty()) {
    return res.status(400).render("projects/edit", {
      errors: errors.array(),
      values,
      project,
      currentUser: req.session.user,
    });
  }

  const newImages = (req.files || []).map((f) => `/uploads/${f.filename}`);

  project.title = req.body.title;
  project.location = req.body.location;
  project.year = parseInt(req.body.year, 10);
  project.category = req.body.category;
  project.materials = req.body.materials;
  project.description = req.body.description;
  project.images = [...(project.images || []), ...newImages];

  await project.save();
  res.redirect(`/projects/${project._id}`);
};

// DELETE /projects/:id
exports.delete = async (req, res) => {
  await Project.deleteOne({ _id: req.params.id });
  res.redirect("/projects");
};