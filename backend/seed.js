import "dotenv/config"
import bcrypt from "bcryptjs"
import { connectDB } from "./utils/db.js"
import User from "./models/users.model.js"

await connectDB()

const existing = await User.findOne({ username: "root" })
if (existing) {
    console.log("Usuario root ya existe")
    process.exit(0)
}

const password = await bcrypt.hash("root", 10)
await User.create({ name: "root", username: "root", password })
console.log("Usuario root creado")
process.exit(0)
