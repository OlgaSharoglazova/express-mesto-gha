const routes = require('express').Router();
const { createUser, login } = require('../controllers/users');
const userRoutes = require('./users');
const cardsRoutes = require('./cards');

routes.post('/signup', createUser);
routes.post('/signin', login);

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);

module.exports = routes;
