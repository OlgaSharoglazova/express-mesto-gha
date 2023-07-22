const express = require('express');
const cardsRoutes = require('express').Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', express.json(), createCard);

cardsRoutes.delete('/:cardId', deleteCard);

cardsRoutes.put('/:cardId/likes', likeCard);

cardsRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRoutes;
