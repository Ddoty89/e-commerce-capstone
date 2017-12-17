'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: { 
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''}
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '' 
  };
};


const UsedProductSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  item:[{
    itemName: {
      type: String, 
      default: ''
    },
    productType: {
      type: String, 
      default: ''
    },
    productValue: {
      type: Number, 
      default: ''
    },
    condition: {
      type: String, 
      default: ''
    },
    description: {
      type: String, 
      default: ''
    }
  }]
});

UsedProductSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    item: this.item || ''
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);
const UsedProduct = mongoose.model('UsedProduct', UsedProductSchema);

module.exports = {User, UsedProduct};
