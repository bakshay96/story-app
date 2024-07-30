const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {statusMiddleware} = require('../Middlewares/statusMiddleware');
const { UserModel } = require('./user.models');

exports.register = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ username, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        return statusMiddleware(500, 'Error registering user')(req, res, next);
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return statusMiddleware(401, 'Invalid credentials')(req, res, next);
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        return statusMiddleware(500, 'Error logging in')(req, res, next);
    }
};

exports.getCurrentUser = (req, res) => {
    res.json(req.user);
};
