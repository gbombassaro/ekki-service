const User = require('../../models/user');
const {RandomHash} = require('random-hash');
const {validateTransaction} = require('./validate');
const {updateAccount} = require('./update');

const newTransaction = async (req, res) => {
  const {origin, destiny, value} = req.body;
  
  if (!origin || !destiny || !value) {
    return res.status(422).json({
      error: true,
      message: "Ocorreu um erro ao processar as informações. Verifique os dados e tente novamente."
    });
  }
  
  const originData = await User.findById(origin);
  const destinyData = await User.findById(destiny);
  const validation = validateTransaction(originData, destinyData, value);

  if (!validation.status) {
    return res.status(422).json({
      error: true,
      message: validation.message
    })
  }

  const generateHash = new RandomHash();
  const transactionId = generateHash();
  const originBalance = validation.originBalance
  const originCredit = validation.originCredit
  const destinyBalance = validation.destinyBalance
  const destinyCredit = validation.destinyCredit
  const transactionInfo = {
    id: transactionId, 
    value,
    processedAt: new Date(),
    status: 'approved'
  }

  const originTicket = {
    id: origin,
    balance: originBalance,
    credit: originCredit,
    newTransaction: transactionInfo
  }

  const destinyTicket = {
    id: origin,
    balance: destinyBalance,
    credit: destinyCredit,
    newTransaction: transactionInfo
  }

  console.log("new transaction > ", transactionInfo);

  // await updateAccount(originTicket);
  // await updateAccount(destinyTicket);
  return res.json(transactionInfo);
}

module.exports = {
  newTransaction
}