const express = require('express');
const cardsRoutes = require('express').Router();
const { getCards, deleteCard, createCard } = require('../controllers/users');

cardsRoutes.get('/', getCards);

cardsRoutes.get('/:cardId', deleteCard);

cardsRoutes.post('/', express.json(), createCard);

module.exports = cardsRoutes;
