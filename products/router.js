'use strict'; 
const express = require('express');
const bodyParser = require('body-parser');

const {UsedProduct} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/used', jsonParser, (req, res) => {
  let {username, itemName, productType, productValue, condition} = req.body;
  return UsedProduct.create({
    username,
  	itemName,
		productType,
		productValue,
 	 	condition
  })
  .then((usedproduct) => {
    return res.status(201).json(usedproduct.serialize());
  })
  .catch(err => {
    if (err.reason === 'ValidationError') {
      return res.status(err.code).json(err);
    }
    res.status(500).json({code: 500, message: 'Internal server error'});
  });
});

router.get('/', (req, res) => {
  return UsedProduct.find()
    .then(usedproduct => res.json(usedproduct.map(usedproduct => usedproduct.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};
