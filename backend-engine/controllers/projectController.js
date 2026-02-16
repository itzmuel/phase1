const { Project, Task } = require('../models');

// GET all projects for the logged-in user
exports.getAllProjects = async (req, res) => {
  const projects = await Project.findAll({ where: { userId: req.user.id } });
  res.json(projects);
};

// POST create a new project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, userId: req.user.id });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update project
exports.updateProject = async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ message: 'Not Found' });
  
  await project.update(req.body);
  res.json(project);
};

// DELETE project
exports.deleteProject = async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ message: 'Not Found' });
  
  await project.destroy();
  res.status(204).send(); // 204 No Content
};