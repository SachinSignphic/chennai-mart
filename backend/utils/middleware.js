import { verifyToken } from "./token.js";

export function verifyTokenMiddleware(req, res, next) {
    try {
        const token = req.headers['auth'];
        const userId = verifyToken(token);
        console.log("-------- Middleware - userId:", userId);
        if (!userId) return res.status(403).json({ error: "Invalid Token!" });
        req.userId = userId;
        next();
    } catch (error) {
        console.log("🚀 ~ verifyTokenMiddleware ~ error:", error)
        return res.status(500).json({ error: "Server error in verifying token!" });
    }
}