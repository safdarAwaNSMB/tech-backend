const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route to render contact form
router.get('/', contactController.showForm);

// Route to handle form submission
router.post('/submit', contactController.submitForm);

module.exports = router;
