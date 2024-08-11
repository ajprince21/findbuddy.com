const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', getProfile);
router.put('/edit', authMiddleware, updateProfile);

module.exports = router;
