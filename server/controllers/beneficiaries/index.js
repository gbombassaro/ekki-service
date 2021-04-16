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
  const favoredId = favoredData._id;
  if (originId.toString() === favoredId.toString()) return res.status(422).json({
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
          name: favoredData.name,
          cpf: favoredData.cpf,
          phone
        }
      }
    }
  )
  await User.updateOne(
    {
      _id: favoredId
    },
    {
      $addToSet: { 
        favoredList: {
          name: originData.name,
          cpf: originData.cpf,
          phone: originData.phone
        }
      }
    }
  )
  return res.json({error: false});
}

const removeFavored = async (req, res) => {
  const {originCpf, favoredCpf} = req.body;
  
  if (!originCpf || !favoredCpf) return res.status(422).json({
    error: true,
    message: 'Dados incompletos'
  });

  await User.updateOne(
    {
      cpf: originCpf,
    },
    {
      $pull: {
        favoredList: {
          cpf: favoredCpf
        }
      }
    }
  )
  await User.updateOne(
    {
      cpf: favoredCpf
    },
    {
      $pull: {
        favoredList: {
          cpf: favoredCpf
        }
      }
    }
  )
  return res.json({error: false});
}

module.exports = {
  createFavored,
  removeFavored
}