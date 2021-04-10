const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  beneficiaryList: {
    type: Array,
    required: false
  },
  balance: {
    type: Number,
    required: false,
  },
  credit: {
    type: Number,
    required: false
  },
  creditLimit: {
    type: Number,
    required: true
  },
  transactionHistory: {
    type: Array,
    required: false,
  }
}, 
{
  timestamps: true
})

module.exports = model('User', UserSchema);