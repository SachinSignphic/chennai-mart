import jwt from "jsonwebtoken";

export function generateToken(userId) {
    return jwt.sign({ userId }, "unakkuthaan", { expiresIn: "2d" });
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, "unakkuthaan");
        return decoded.userId;
    } catch (error) {
        return false;
    }
}
