'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {UsedProduct} = require('../users');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/used', jsonParser, (req, res) => {
  let {username, itemName, productType, productValue, condition} = req.body;
  console.log(req.body);
  console.log(username);
  console.log(itemName);
  return UsedProduct.create({
    username,
  	itemName,
		productType,
		productValue,
 	 	condition
  })
  .then(() => {
    return res.status(201).json(user.serialize());
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
