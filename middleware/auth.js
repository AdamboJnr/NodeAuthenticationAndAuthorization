const jwt = require('jsonwebtoken');

const authorize = async (req,res,next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(404).json({ message: "No token provided "});
    }

    try {
        let user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = user.email;

        next();
    } catch (error) {
        return res.status(403).json({ message: "Access Denied"});
    }

}

module.exports = authorize;