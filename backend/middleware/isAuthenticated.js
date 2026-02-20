import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        //Get token from Authorization header (format: "Bearer <token>")
        const authHeader = req.headers.authorization;
        const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please provide a token."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.id = decoded.userId;
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token",
        });
    }
};

export default isAuthenticated;