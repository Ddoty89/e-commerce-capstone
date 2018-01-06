'use strict'; 
const express = require('express');
const bodyParser = require('body-parser');

const {UsedProduct, NewProduct} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/used', jsonParser, (req, res) => {
  let {username, itemName, productType, productValue, condition, description, image} = req.body;
  description = description.trim();
  return UsedProduct.create({
    username,
  	itemName,
		productType,
		productValue,
 	 	condition,
    description,
    image
  })
  .then((usedproduct) => {
    return res.status(201).json(usedproduct.serialize());
  })
  .catch(err => {
    if (err.reason === 'ValidationError') {
      return res.status(err.code).json(err);
    }
    res.status(500).json({code: 500, message: err});
  });
});

router.get('/used', (req, res) => {
  UsedProduct
  .find()
  .then(usedproduct => res.json({
    usedproduct: usedproduct.map(
      usedproduct => usedproduct.serialize())
  }))
    .catch(err => res.status(500).json({message: err}));
});


router.post('/new', jsonParser, (req, res) => {
  let {newImage, newName, newType, newPrice, newURL} = req.body;
  return NewProduct.create({
    newImage,
    newName,
    newType,
    newPrice,
    newURL
  })
  .then((newproduct) => {
    return res.status(201).json(newproduct.serialize());
  })
  .catch(err => {
    if (err.reason === 'ValidationError') {
      return res.status(err.code).json(err);
    }
    res.status(500).json({code: 500, message: err});
  });
});

router.get('/new', (req, res) => {
  NewProduct
  .find()
  .then(newproducts => res.json({
    newproducts: newproducts.map(
      (newproduct) => newproduct.serialize())
  }))
  .catch(err => {
    console.error(err)
    res.status(500).json({message: err})
  });
});
   

module.exports = {router};
