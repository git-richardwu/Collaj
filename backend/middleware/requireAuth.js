const jsonWebToken = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token is required.'});
    }
    const token = authorization.split(' ')[1];
    try {
        const {_id} = jsonWebToken.verify(token, process.env.SECRET);
        req.user = {_id};
        next();
    } catch (error) {
        res.status(401).json({error: "Request not authorized"});
    }
}
module.exports = requireAuth;