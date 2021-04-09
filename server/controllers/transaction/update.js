const User = require('../../models/user');

const update = (origin, finalBalance, transactionInfo) => {
  return User.updateOne(
    {_id: origin},
    {balance: finalBalance, $push: {transactionHistory: transactionInfo}}
  );
}

module.exports = {
  update
}