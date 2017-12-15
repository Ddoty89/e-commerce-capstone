const express = require('express');
const bodyParser = require('body-parser');

const {UsedProduct} = require('../users');

const router = express.Router();

const jsonParser = bodyParser.json();


router.get('/used')

module.exports = {router};
