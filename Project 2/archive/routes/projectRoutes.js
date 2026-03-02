const express = require("express");
const { body } = require("express-validator");
const projects = require("../controllers/projectController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, projects.list);

router.get("/new", requireAdmin, projects.getNew);
router.post(
  "/",
  requireAdmin,
  body("title").trim().isLength({ min: 2 }).withMessage("Title is required."),
  body("location").trim().notEmpty().withMessage("Location is required."),
  body("year").isInt({ min: 1800, max: 2100 }).withMessage("Year must be valid."),
  body("category").trim().notEmpty().withMessage("Category is required."),
  body("description").trim().isLength({ min: 10 }).withMessage("Description must be at least 10 characters."),
  projects.postNew
);

router.get("/:id", requireAuth, projects.detail);

router.get("/:id/edit", requireAdmin, projects.getEdit);
router.put(
  "/:id",
  requireAdmin,
  body("title").trim().isLength({ min: 2 }).withMessage("Title is required."),
  body("location").trim().notEmpty().withMessage("Location is required."),
  body("year").isInt({ min: 1800, max: 2100 }).withMessage("Year must be valid."),
  body("category").trim().notEmpty().withMessage("Category is required."),
  body("description").trim().isLength({ min: 10 }).withMessage("Description must be at least 10 characters."),
  projects.putEdit
);

router.delete("/:id", requireAdmin, projects.delete);

module.exports = router;