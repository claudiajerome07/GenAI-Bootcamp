const express = require('express');
const router = express.Router();
const handleLawBotChat = require('../controllers/lawbotController');

// POST /api/lawbot
router.post('/', handleLawBotChat);

module.exports = router;
