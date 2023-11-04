const express = require('express'),
router = express.Router(),
userRoutes = require('./User.router'),
postRoutes = require('./Post.router'),
categoryRoutes = require('../routes/Category.router')

router.use('/user', userRoutes)
router.use('/post', postRoutes)
router.use ('/category', categoryRoutes)

module.exports = router;