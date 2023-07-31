const userRoutes = require('express').Router();
const {
  getUsers,
  updateUser,
  updateAvatar,
  getUser,
  getUserMe,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/me', getUserMe);

userRoutes.patch('/me', updateUser);

userRoutes.patch('/me/avatar', updateAvatar);

userRoutes.get('/:userId', getUser);

module.exports = userRoutes;
