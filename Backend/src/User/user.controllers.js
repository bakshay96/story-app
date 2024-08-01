// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('./user.models');
const { statusMiddleware } = require('../Middlewares/statusMiddleware');

// const register = async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         let user = await UserModel.findOne({ email });

//         if (user) {
//             return res.fail('User already exists', 400);
//         }

//         user = new UserModel({ username, email, password });

//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         const payload = { id: user.id };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '5h' },
//             (err, token) => {
//                 if (err) throw err;
//                 res.status(201).success({ token }, 'User registered successfully');
//             }
//         );
//     } catch (error) {
//         next(error);
//     }
// };

// const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             return res.fail('Invalid credentials', 400);
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.fail('Invalid credentials', 400);
//         }

//         const payload = { id: user.id };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '5h' },
//             (err, token) => {
//                 if (err) throw err;
                
//                 res.success({ token }, 'User logged in successfully');
//             }
//         );
//     } catch (error) {
//         next(error);
//     }
// };

// const getCurrentUser = async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.user.id).select('-password');
//         res.success(user, 'User data fetched successfully');
//     } catch (error) {
//         next(error);
//     }
// };


exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return statusMiddleware(400, 'User already exists')(req, res, next);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();
        const payload = { id: user.id };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '12h' },
            (err, token) => {
                if (err) throw err;
                
                res.status(201).success({ token }, 'User registered successfully done');
            }
        );
        //res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return statusMiddleware(400, 'Invalid credentials')(req, res, next);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return statusMiddleware(400, 'Invalid credentials')(req, res, next);
        }
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

exports.getCurrentUser = async (req, res, next) => {
    try {
        res.json({"current-user":req.user});
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers  = async (req,res,next) => {

    try {
        const users= await UserModel.find({},{username:1,email:1,_id:1});

        res.status(201).success({count:users.length,users},"Fetch all users successfully")
        
    } catch (error) {
        next(error)
    }
}

// module.exports = { register, login, getCurrentUser };
