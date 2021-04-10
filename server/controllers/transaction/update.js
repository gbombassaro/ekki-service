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

module.exports = {
  updateAccount
}