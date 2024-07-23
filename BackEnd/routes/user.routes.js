import express from "express"
import { isAuthenticated } from "../Middleware/verifyToken.js"
import getUserForSidebar from "../controller/user.controller.js"

const router = express.Router()

router.get("/", isAuthenticated, getUserForSidebar)

export default router