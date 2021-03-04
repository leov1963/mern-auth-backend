require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// database
const db = require('../models')

const test = (req, res) => {
    res.json({ message: 'User endpoint OK! ✅' });
}

module.exports = {
    test,
}