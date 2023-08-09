const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const auth = require('../middlewares/auth');

const regularExpression = require('../utils/constants');

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regularExpression),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

routes.use('/users', auth, userRoutes);
routes.use('/cards', auth, cardsRoutes);

module.exports = routes;
