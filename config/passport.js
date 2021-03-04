require('dotenv').config();
// A passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using a token
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt

// refactored with destructuring 
const { Strategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');

// Import User Model
const { User } = require('../models/user')


const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    passport.use(new Strategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
            // jwt.payload is an object that contains JWT info
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
            // const userOrNot = user ? done(null, user) : done(null, false);
            // return userOrNot;
        })
        .catch(err => {
            console.log("==================> error below (passport.js)")
            console.log(err);
        })
    }));
}