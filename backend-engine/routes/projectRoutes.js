const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const protect = require('../middleware/auth'); 

// All these routes are protected by JWT
router.use(protect);

router.route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router.route('/:id')
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;