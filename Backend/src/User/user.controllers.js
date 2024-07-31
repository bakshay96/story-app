// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('./user.models');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await UserModel.findOne({ email });

        if (user) {
            return res.fail('User already exists', 400);
        }

        user = new UserModel({ username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { id: user.id };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).success({ token }, 'User registered successfully');
            }
        );
    } catch (err) {
        next(err);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.fail('Invalid credentials', 400);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.fail('Invalid credentials', 400);
        }

        const payload = { id: user.id };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                
                res.success({ token }, 'User logged in successfully');
            }
        );
    } catch (err) {
        next(err);
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        res.success(user, 'User data fetched successfully');
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login, getCurrentUser };
