const Category = require('../models/Category.model')

const createCategory  = async (req, res) => {
    try {
        const category = new Category(req.body)
        const resp = await category.save()
        return res.json({
            message: 'Post was created successfully',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err.message
        })
    }
}

const getCategories = async (req, res) => {
    try {
        const resp = await Category.find()
        return res.json({
            message: 'Categories',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err.message
        })
    }
}



module.exports = {
    createCategory,
    getCategories
}