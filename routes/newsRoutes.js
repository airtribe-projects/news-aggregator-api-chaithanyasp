const express = require('express');
const router = express.Router();
const {getNews,searchNews} = require('../Controllers/newController');
const {protect} =require('../Middelware/authMiddleware');
 
router.get('/',protect,getNews);
router.get('/search',protect,searchNews);

module.exports = router