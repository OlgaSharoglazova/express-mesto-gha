const express = require('express');
const cardsRoutes = require('express').Router();
const { getCards, deleteCard, createCard } = require('../controllers/cards');

cardsRoutes.get('/', getCards);

cardsRoutes.delete('/:cardId', deleteCard);

cardsRoutes.post('/', express.json(), createCard);

module.exports = cardsRoutes;
