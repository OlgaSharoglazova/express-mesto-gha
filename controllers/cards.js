const Card = require('../models/card');
const {
  SUCCESS,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require('../utils/constants');

module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.status(SUCCESS).send(cards))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCESS).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Нет карточки с таким id' });
      }
      Card.findByIdAndRemove(req.params.cardId);
    })
    .then(() => {
      res.status(SUCCESS).send({ message: 'Карточка удалена' });
    })
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(NOT_FOUND).send({ message: 'Нет карточки с таким id' });
    } res.status(SUCCESS).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(NOT_FOUND).send({ message: 'Нет карточки с таким id' });
    } res.status(SUCCESS).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' });
  });
