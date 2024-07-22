import express from "express"
import { isAuthenticated } from "../Middleware/verifyToken.js"
import { sendMessage } from "../controller/message.controller.js"
import { receiveMessage } from "../controller/message.controller.js"

const router = express.Router()

router.post("/send/:id", isAuthenticated, sendMessage)

router.get("/:id", isAuthenticated, receiveMessage)
export default router;