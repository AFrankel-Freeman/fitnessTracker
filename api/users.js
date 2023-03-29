/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {getUserByUsername, createUser} = require('../db');

// POST /api/users/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return;
        }
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            res.send({ name: 'User Taken Error', message: `User ${username} is already taken.`, error: 'UserTakenError'});
        } else  if (password.length < 8) {
            res.send({ name: 'Password Too Short Error', message: `Password Too Short!`, error: 'PasswordTooShortError'});
        } else {
            const newUser = await createUser({username, password});
            const token = jwt.sign({
                id: newUser.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });
            res.send({
                message: 'Thank you for signing up!',
                token,
                user: newUser
            });
        }
    } catch (error){
        console.error(error)
    }
});

// POST /api/users/login
router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return;
        }
        const user = await getUserByUsername(username);

        if (user && user.password === password) {
            const token = jwt.sign({
                id: user.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });
            res.send({
                message: "you're logged in!",
                token,
                user
            });
        } else {
            res.send({ name: 'Incorrect Credentials Error', message: 'Username and password do not match!', error: 'IncorrectCredentialsError'});
        }
    } catch (error) {
        console.error(error);
    }
})

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
