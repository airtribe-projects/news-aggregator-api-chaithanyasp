const express = require('express')
const router = express.Router()
const { getPreferences, updatePreferences } = require('../Controllers/preferenceController');
const { protect } = require('../Middelware/authMiddleware');

router.get('/preferences', protect, getPreferences);
router.put('/preferences', protect, updatePreferences);

module.exports = router;