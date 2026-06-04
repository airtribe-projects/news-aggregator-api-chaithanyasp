const express = require('express');
const router = express.Router();
const {register,login } = require('../Controllers/authController');
const {validate,registerRules,loginRules} = require('../Middelware/validateMiddleware');

router.post('/register', registerRules,validate,register);
router.post('/login', loginRules, validate, login);

module.exports = router;