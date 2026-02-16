const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Check if the request has an Authorization header starting with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add the user data to the request so the controller can use it
            req.user = decoded;

            next(); // Move to the next function (the controller)
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' }); // Requirement: Proper status codes
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' }); // Requirement: 401 for Unauthorized
    }
};

module.exports = protect;