const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const PhoneSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    require: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  }
})

const Phone = mongoose.model('Phone', PhoneSchema);

module.exports = Phone;
