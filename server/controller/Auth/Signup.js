const User = require('../../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.Signup = async (req, res) => {
  try {
    const { firstName,lastName, email, phoneNumber, password, confirmPassword } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !phoneNumber
    ) {
        return res.status(400).json({
            success: false,
            message: "All fields has to filled",
        })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and Confirm Password do not match. Please try again.",
        })
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

