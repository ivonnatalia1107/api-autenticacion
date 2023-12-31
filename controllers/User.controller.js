const User = require('../models/User.model')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try {
        const { mail, password } = req.body
        const existingUser = await User.findOne({ mail })
        if (existingUser) {
            return res.json({
                message: "user already exists"
            })
        }
        const user = new User(req.body)
        user.hashPassword(password)
        const resp = await user.save()
        return res.json({
            message: 'User was created successfully',
            detail: user.onSignUpGenerateJWT()
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const resp = await User.find()
        return res.json({
            message: 'Users',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const newData = req.body

        const resp = await User.findByIdAndUpdate(
            newData.userId,
            { $set: newData },
            { new: true })

        return res.json({
            message: 'User updated successfully',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const resp = await User.findByIdAndDelete(req.body.userId)

        return res.json({
            message: 'User deleted successfully',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err
        })
    }
}

const login = async (req, res) => {
    try {
        const { mail, password } = req.body
        const userFound = await User.findOne({ mail })
        if(!userFound) {
            return res.json({
                message: "user not found"
            })
        }
        const isCorrectPassword = await bcrypt.compareSync(password, userFound.password)
        if (isCorrectPassword) {
            return res.json({
                message: "ok",
                detail: { user: userFound, token: userFound.generateJWT() }
            })
        }
    } catch (error) {
        return res.json({
            message: "error",
            detail: error.message
        })
    }
}

module.exports = {
    signUp,
    getUsers,
    updateUser,
    deleteUser,
    login
}