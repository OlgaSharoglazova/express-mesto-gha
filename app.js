const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
