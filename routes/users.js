const express = require('express');
const userRoutes = require('express').Router();
const { getUsers, updateUser, updateAvatar, getUser, createUser } = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.patch('/me', updateUser);

userRoutes.patch('/me/avatar', updateAvatar);

userRoutes.get('/:userId', getUser);

userRoutes.post('/', express.json(), createUser);

module.exports = userRoutes;
