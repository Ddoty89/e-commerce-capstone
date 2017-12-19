'use strict';
const mongoose = require('mongoose');

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

const UsedProduct = mongoose.model('UsedProduct', UsedProductSchema);

module.exports = {UsedProduct};
