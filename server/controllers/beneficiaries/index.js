const User = require('../../models/user')

const createFavored = async (req, res) => {
  const {originId, name, cpf, phone = ''} = req.body;

  const originData = await User.findById(originId);
  if (!originData._id || !name || !cpf) return res.status(422).json({
    error: true,
    message: 'Dados incompletos'
  });

  const favored = await User.find({cpf});
  if (!favored[0]) return res.status(422).json({
    error: true,
    message: 'Não existe uma conta com esse CPF na Ekki'
  });

  const favoredData = favored[0];
  if (originId.toString() === favoredData._id.toString()) return res.status(422).json({
    error: true,
    message: 'Conta inválida.'
  });

  await User.updateOne(
    {
      _id: originId,
    },
    {
      $addToSet: { 
        favoredList: {
          id: favoredData._id,
          name: favoredData.name,
          cpf: favoredData.cpf,
          phone
        }
      }
    }
  )
  return res.json({error: false});
}

const removeFavored = async (req, res) => {
  const {originId, favoredId} = req.body;
  
  if (!originId || !favoredId) return res.status(422).json({
    error: true,
    message: 'Dados incompletos'
  });

  await User.findByIdAndUpdate(
    {originId},
    {
      $pull: {
        favoredList: {
          id: favoredId
        }
      }
    }
  ).then(payload => console.log(payload)).catch(e => console.log(e))
  return res.json({error: false});
}

module.exports = {
  createFavored,
  removeFavored
}