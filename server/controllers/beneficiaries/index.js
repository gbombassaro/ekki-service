const User = require('../../models/user')

const createBeneficiary = async (req, res) => {
  const {originId, beneficiaryId} = req.body;

  if (!originId || !beneficiaryId) return res.status(422).json({
    error: true,
    message: 'Dados incompletos: beneficiaryId & originId'
  });

  const originData = await User.findById(originId);
  const beneficiaryData = await User.findById(beneficiaryId);

  await User.updateOne(
    {
      _id: originId,
    },
    {
      $addToSet: { 
        beneficiaryList: {
          id: beneficiaryData._id,
          name: beneficiaryData.name,
          cpf: beneficiaryData.cpf
        }
      }
    }
  )
  await User.updateOne(
    {
      _id: beneficiaryId
    },
    {
      $addToSet: { 
        beneficiaryList: {
          id: originData._id,
          name: originData.name,
          cpf: originData.cpf
        }
      }
    }
  )
  return res.json({error: false});
}

const removeBeneficiary = async (req, res) => {
  const {originId, beneficiaryId} = req.body;
  
  if (!originId || !beneficiaryId) return res.status(422).json({
    error: true,
    message: 'Dados incompletos: beneficiaryId & originId'
  });

  await User.updateOne(
    {
      _id: originId,
    },
    {
      $pull: {
        beneficiaryList: {
          id: beneficiaryId
        }
      }
    }
  )
  await User.updateOne(
    {
      _id: beneficiaryId
    },
    {
      $pull: {
        beneficiaryList: {
          id: beneficiaryId
        }
      }
    }
  )
  return res.json({error: false});
}

module.exports = {
  createBeneficiary,
  removeBeneficiary
}