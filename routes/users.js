const express = require('express');
const userRoutes = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', getUser);

userRoutes.post('/', express.json(), createUser);

module.exports = userRoutes;
