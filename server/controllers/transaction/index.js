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
  const validation = validateTransaction(originData.balance, value);

  if (!validation.success) {
    return res.status(422).json({
      error: true,
      message: validation.message
    })
  }

  const originFinalBalance = validation.balance;
  const destinyFinalBalance = destinyData.balance + value;
  const generateHash = new RandomHash();
  const transactionId = generateHash();
  const transactionInfo = {
    id: transactionId, 
    origin,
    destiny,
    value,
    processedAt: new Date(),
    status: 'approved'
  }

  await updateAccount(origin, originFinalBalance, transactionInfo);
  await updateAccount(destiny, destinyFinalBalance, transactionInfo);

  return res.json({originBalance: originFinalBalance})
}

module.exports = {
  newTransaction
}