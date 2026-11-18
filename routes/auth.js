import express from "express"
import { findByUsername } from "../utils/db.js"
import { signToken } from "../utils/jwt.js"

const router = express.Router()


router.post("/login", (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const user = findByUsername(username)
    if (!user || user._password !== password){
        return res.status(401).json({ error: "Invalid username or password" })
    }

    const token = signToken({
        id: user.id,
        name: user.name,
        username,
        role: user.role
    })
    return res.status(200).json({ message: "Logged in", token })
})

export default router