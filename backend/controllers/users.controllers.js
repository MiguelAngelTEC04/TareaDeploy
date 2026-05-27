import User from "../models/users.model.js"
import bcrypt from "bcryptjs"

export const getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

export const getUser = async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.json(user)
}

export const postUser = async (req, res) => {
    const {name, username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({name, username, password: hashedPassword})
    await user.save()
    res.json({users: user})
}

export const putUser = async (req, res) => {
    const id = req.params.id
    const { name, username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.findByIdAndUpdate(id, { name, username, password: hashedPassword }, { new: true })
    res.json(user)
}

export const delUser = async (req, res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.json({ message: "User deleted successfully" })
}
