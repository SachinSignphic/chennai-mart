import express from "express";
import { verifyTokenMiddleware } from "../utils/middleware.js";
import FeedbackModel from "../models/Feedback.js";
const router = express.Router();

router.post('/report', verifyTokenMiddleware, async (req, res) => {
    try {
        const { message } = req.body;
        if (message.length < 5) return res.status(400).json({ error: 'Message is too short to be accepted' });
        const feedbackData = await FeedbackModel.create({
            userId: req.userId,
            category: 'report',
            message: message
        });
        return res.json({ message: "Feedback successful!" });
    } catch (error) {
        console.log("🚀 ~ router.post ~ error:", error)
        return res.status(500).json({ error: 'Server error in saving feedback' });
    }
});

export default router;