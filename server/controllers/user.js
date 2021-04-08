const User = require('../models/user');

const listUsers = async (req, res) => {
  const users = await User.find({});
  return res.json(users);
}

const createUser = async (req, res) => {
  const {name, cpf, phone} = req.body;
  if (!name || !cpf || !phone) return res.status(422).json({error: true, message: "Ocorreu um erro ao processar as informações. Verifique os dados e tente novamente."});

  const alreadyRegistered = await User.find({cpf: cpf});
  if (alreadyRegistered.length > 0) return res.status(422).json({error: true, message: "Este CPF já está associado a uma conta."})

  const newUser = await User.create({
    name: name,
    cpf: cpf,
    phone: phone,
    beneficiaryList: [],
    balance: 1000,
    credit: 500,
    transactionHistory: []
  })

  return res.json(newUser)
}

module.exports = {
  createUser,
  listUsers
}