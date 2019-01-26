const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { renderToString } = require('react-dom/server');
const router = require('./routes.js');
const db = require('../database/index.js');

const app = express();

//Middleware

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

//Middelware-Router
app.use(router);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
