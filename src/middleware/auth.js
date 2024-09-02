import jwt from 'jsonwebtoken'

function verifyToken(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access token required"
            })
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return true;

    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token"
        })
    }
}

export {
    verifyToken
}