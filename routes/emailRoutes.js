const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/', emailController.createEmail);
router.get('/:id', emailController.getEmail);
router.get('/', emailController.getAllEmails);
router.delete('/:id', emailController.deleteEmail);
router.get('/unsent', emailController.getUnsentEmails);

module.exports = router;
