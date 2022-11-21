const User = require('../models/userModel');
const jsonWebToken = require('jsonwebtoken');

const generateToken = (_id) => {
   return jsonWebToken.sign({_id}, process.env.SECRET, { expiresIn: '7d'});
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password);
        const token = generateToken(user._id);
        res.status(200).json({username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const signupUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const createdUser = await User.signup(username, password);
        const token = generateToken(createdUser._id);
        res.status(200).json({username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    loginUser,
    signupUser
};