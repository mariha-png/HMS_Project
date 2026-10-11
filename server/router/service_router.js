const express = require('express');
const maintenanceController = require('../controllers/maintenance_controller');
const feedbackController = require('../controllers/feedback_controller');
const userauthmiddleware = require('../middlewares/user_auth_middleware');
const router = express.Router();

// PDF: Maintenance Requests
router.route('/report-issue').post(userauthmiddleware, maintenanceController.reportIssue);
router.route('/update-task/:id').patch(userauthmiddleware, maintenanceController.updateTaskStatus);

// PDF: Feedback Mechanism
router.route('/feedback').post(userauthmiddleware, feedbackController.submitFeedback);

module.exports = router;