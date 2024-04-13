const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY

const authMiddleware = (req,res,next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ error: 'Authentication failed' });

    jwt.verify(token, key, (err, user) => {
        if (err) return res.status(401).json({ error: 'Token is not valid' });
        req.user = user;
        next();
    });
}

module.exports = authMiddleware;