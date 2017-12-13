const express = require('express');
const bodyParser = require('body-parser');

const {UsedProduct} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();


router.get('/used')