import User from "../models/users.model.js"
import bcrypt from "bcryptjs"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const postUser = async (req, res) => {
    try {
        const {name, username, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({name, username, password: hashedPassword})
        await user.save()
        res.json({users: user})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const putUser = async (req, res) => {
    try {
        const id = req.params.id
        const { name, username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.findByIdAndUpdate(id, { name, username, password: hashedPassword }, { new: true })
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const delUser = async (req, res) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete(id)
        res.json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
