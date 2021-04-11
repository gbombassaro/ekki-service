const User = require('../../models/user');

const updateAccount = ({id, balance, credit, newTransaction}) => {
  return User.updateOne(
    {
      _id: id
    },
    {
      balance: balance,
      credit: credit,
      $push: {transactionHistory: newTransaction}
    }
  );
}

const cancelLatestTransaction = ({id, transactionId}) => {
  return User.updateOne(
    {
      _id: id,
      transactionHistory: {id: transactionId},
    },
    {
      $set: {'transactionHistory.$.status': 'canceled'}
    }
  )
}

module.exports = {
  updateAccount,
  cancelLatestTransaction
}