const user = require('../models/User');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async function (req, res) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const jwt = require('jsonwebtoken');
exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required !!"
            });
        }
        const userEmail = await User.findOne({ email });

        if (!userEmail) {
            return res.status(400).json({
                success: false,
                message: "User not Found"
            });
        }

        const isMatch = await bcrypt.compare(password, userEmail.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }
        const token = jwt.sign(
            { id: userEmail._id }, "secretkey", { expiresIn: "1d" }
        )

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                id: userEmail._id,
                name: userEmail.name,
                email: userEmail.email
            }
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}