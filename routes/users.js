const express = require('express');
const userRoutes = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

userRoutes.get('/users', getUsers);

userRoutes.get('/users/:userId', getUser);

userRoutes.post('/users', express.json(), createUser);

module.exports = userRoutes;
