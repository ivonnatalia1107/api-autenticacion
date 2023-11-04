const express = require('express'),
router = express.Router(),
{
    createCategory,
    getCategories
} = require('../controllers/Category.controller.')

router.post('/', createCategory)
router.get('/', getCategories)

module.exports = router