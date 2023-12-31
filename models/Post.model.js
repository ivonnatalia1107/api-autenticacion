const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    photo: { type: String },
    state: { type: Boolean },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post