import { Router } from "express"
import bcrypt from "bcryptjs"
import User from "../models/users.model.js"

const router = Router()

router.get("/seed", async (req, res) => {
    try {
        const existing = await User.findOne({ username: "root" })
        if (existing) return res.json({ msg: "Usuario root ya existe" })
        const password = await bcrypt.hash("root", 10)
        await User.create({ name: "root", username: "root", password })
        res.json({ msg: "Usuario root creado" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

export default router