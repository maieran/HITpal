// controllers/register.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //const exisitingUser = await User.findOne({ where: {email}});

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = registerUser;
