const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require('../utils/constants');

module.exports.getUsers = (_req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((newAvatar) => res.send(newAvatar))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
