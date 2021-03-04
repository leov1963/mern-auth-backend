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

const register = (req, res) => {
    // post adding new user to db
    console.log('******INSIDE OF /register******')
    console.log("REQ.BODY============>")
    console.log(req.body)

    db.User.findOne({ email: req.body.email })
    .then(user => {
        // if email already exists, user will come back
        if (user) {
            // send a 400 response
            return res.status(400).json({ message: 'Email already exists' });
        } else {
            // create new user
            const newUser = new db.User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // salt and hash password before saving user
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw Error;

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw Error;

                    newUser.password = hash;
                    newUser.save()
                    .then(createdUser => res.json(createdUser))
                    .catch(err => console.log(err))
                })
            })
        }
    })
    .catch(err => console.log("error finding user", err))
}

module.exports = {
    test, register
}