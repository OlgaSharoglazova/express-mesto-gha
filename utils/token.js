const JWT = require('jsonwebtoken');

const SECRET_KEY = 'secret';

function generateToken(payload) {
  return JWT.sign(payload, SECRET_KEY);
}

function checkToken(token) {
  if (!token) {
    return false;
  }
  try {
    return JWT.verify(token, SECRET_KEY);
  } catch (err) {
    return false;
  }
}

module.exports = { generateToken, checkToken };
