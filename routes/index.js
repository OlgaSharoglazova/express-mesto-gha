const routes = require('express').Router();

const { createUser, login } = require('../controllers/users');
const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const auth = require('../middlewares/auth');

routes.post('/signup', createUser);
routes.post('/signin', login);

routes.use('/users', auth, userRoutes);
routes.use('/cards', auth, cardsRoutes);

module.exports = routes;
