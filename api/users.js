/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const requireUser = require('./utils');
require('dotenv').config();

const { getUserByUsername, createUser, getUserById, getAllRoutinesByUser, getPublicRoutinesByUser } = require('../db');

// POST /api/users/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return;
        }
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            res.send({ name: 'User Taken Error', message: `User ${username} is already taken.`, error: 'UserTakenError' });
        } else if (password.length < 8) {
            res.send({ name: 'Password Too Short Error', message: `Password Too Short!`, error: 'PasswordTooShortError' });
        } else {
            const newUser = await createUser({ username, password });
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
    } catch (error) {
        console.error(error)
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
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
                message: "You're logged in!",
                token,
                user
            });
        } else {
            res.send({ name: 'Incorrect Credentials Error', message: 'Username and password do not match!', error: 'IncorrectCredentialsError' });
        }
    } catch (error) {
        console.error(error);
    }
});

// GET /api/users/me
router.get('/me', requireUser, async (req, res) => {
    try {
        const user = await getUserById(req.user.id);
        res.send(user);
    } catch (err) {
        console.log(err)
    }
});

// GET /api/users/:username/routines
router.get('/:username/routines', async (req, res) => {
    const username = req.params.username;
    try {
        const user = await getUserByUsername(username);
        if (req.user && req.user.username === user.username) {
            const allRoutines = await getAllRoutinesByUser(req.user);
            res.send(allRoutines);
        } else {
            const allPublicRoutines = await getPublicRoutinesByUser(user);
            res.send(allPublicRoutines);
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
