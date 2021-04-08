const User = require('../models/user');
const {RandomHash} = require('random-hash');

const newTransaction = async (req, res) => {
  const {origin, destiny, value} = req.body;

  if (!origin || !destiny || !value) return res.status(422).json({error: true, message: "Ocorreu um erro ao processar as informações. Verifique os dados e tente novamente."});

  const originData = await User.findById('606f763fc25b0d26f1a9787c') ;
  const originFinalBalance = originData.balance + value;

  const generateHash = new RandomHash();
  const transactionId = generateHash();
  await User.updateOne({_id: '606f763fc25b0d26f1a9787c'}, {balance: originFinalBalance});

  // const newHistory = [...originData.transactionHistory, {id: transactionId, time: new Date()}]
  // await User.updateOne({_id: '606f763fc25b0d26f1a9787c', {transactionHistory: newHistory})
  // console.log(transactionId)

  return res.json({funfando: true})
}

module.exports = {
  newTransaction
}