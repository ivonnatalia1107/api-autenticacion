const Post = require('../models/Post.model')

const createPost = async (req, res) => {
    try {
        const post = new Post(req.body)
        const resp = await post.save()
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

const getPosts = async (req, res) => {
    try {
        const resp = await Post.find()
        return res.json({
            message: 'Posts',
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
    createPost,
    getPosts
}