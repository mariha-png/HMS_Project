const express = require('express');
const invoiceController = require('../controllers/invoice_controller');
const userauthmiddleware = require('../middlewares/user_auth_middleware');
const router = express.Router();

// PDF: Generate accurate bills based on services
router.route('/generate').post(userauthmiddleware, invoiceController.generateInvoice);

module.exports = router;