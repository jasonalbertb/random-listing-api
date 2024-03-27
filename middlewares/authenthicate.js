const jwt = require('jsonwebtoken');
const {UnauthorizedErr} = require("../error/UnauthorizedErr");

const authenticate = async (req, res, next)=>{

    const token = req.cookies.access_token;
    if (!token) {
        throw new UnauthorizedErr("Authentication error")
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if (err) {
            throw new UnauthorizedErr('Unauthorized user error')
        }

        req.user = user;
        next()
    })


}

module.exports = {
    authenticate
}
