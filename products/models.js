'use strict';
const mongoose = require('mongoose');
require('mongoose-type-url');

mongoose.Promise = global.Promise;

const UsedProductSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  itemName: {
    type: String, 
    default: ''
  },
  productType: {
    type: String, 
    default: ''
  },
  productValue: {
    type: String, 
    default: ''
  },
  condition: {
    type: String, 
    default: ''
  }
});

UsedProductSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    itemName: this.itemName || '',
    productType: this.productType || '',
    productValue: this.productValue || '',
    condition: this.condition || ''
  };
};

const NewProductSchema = mongoose.Schema({
  newImage: {
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url
  },
  newName: {
    type: String, 
    required: true
  },
  newType: {
    type: String, 
    required: true
  },
  newPrice: {
    type: String, 
    required: true
  },
  newURL: {
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url
  }
});

NewProductSchema.methods.serialize = function() {
  return {
    newImage: this.newImage || '',
    newName: this.newName || '',
    newType: this.newType || '',
    newPrice: this.newPrice || '',
    newURL: this.newURL || ''
  };
};

const UsedProduct = mongoose.model('UsedProduct', UsedProductSchema);
const NewProduct = mongoose.model('NewProduct', NewProductSchema);

module.exports = {UsedProduct, NewProduct};
