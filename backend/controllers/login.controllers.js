import User from "../models/users.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            )
            res.json({ login: true, msg: "OK", user, token })
        } else {
            res.status(404).json({ login: false, msg: "wrong", user: {} })
        }
    } catch (error) {
        res.status(500).json({ login: false, msg: error.message })
    }
}