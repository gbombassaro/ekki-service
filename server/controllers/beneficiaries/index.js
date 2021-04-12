const User = require('../../models/user')

const createBeneficiary = async (req, res) => {
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
      $addToSet: { beneficiaryList: beneficiaryId }
    }
  )
  await User.updateOne(
    {
      _id: beneficiaryId
    },
    {
      $addToSet: { beneficiaryList: originId }
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
      $pull: { beneficiaryList: beneficiaryId }
    }
  )
  await User.updateOne(
    {
      _id: beneficiaryId
    },
    {
      $pull: { beneficiaryList: originId }
    }
  )
  return res.json({error: false});
}

module.exports = {
  createBeneficiary,
  removeBeneficiary
}