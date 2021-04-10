const {subMinutes, isAfter} = require('date-fns');

//Validate cancel latest transaction
const cancelLatestTransaction = (originData, value) => {
  const transactionHistory = originData.transactionHistory;
  const latestTransaction = transactionHistory[transactionHistory.length - 1];
  const latestTransactionId = latestTransaction.id;
  const latestTransactionValue = latestTransaction.value;
  const latestTransactionTime = transactionHistory[transactionHistory.length - 1].processedAt;
  const now = new Date();
  const limit = subMinutes(now, 2);
  const cancelZone = isAfter(latestTransactionTime, limit);
  if (cancelZone && value === latestTransactionValue) return {
    status: 'cancelLatest',
    transactionId: latestTransactionId
  }
  return {status: false};
}

//Validate transaction using credit
const validateOriginAndDestiny = (originData, destinyData, value) => {
  const originBalance = originData.balance;
  const finalBalance = originBalance - value;

  if (finalBalance < 0) {
    const {credit, creditLimit} = originData;
    const valorFinal = credit + (finalBalance * -1);
    if (valorFinal > creditLimit) return {
      status: false,
      message: 'Saldo insuficiente.',
    }
    return {
      status: 'credit',
      originBalance: finalBalance,
      originCredit: valorFinal,
      destinyBalance: 0,
      destinyCredit: 0,
    }
  }

  // const destinyFinalBalance = destinyData.balance + value;
  return {
    status: true,
    originBalance: originBalance - value,
    originCredit: originData.credit,
    destinyBalance: 0,
    destinyCredit: 0,
  }
}

//Main validation method
const validateTransaction = (originData, destinyData, value) => {
  const timeValidation = cancelLatestTransaction(originData, value);
  const validation = validateOriginAndDestiny(originData, destinyData, value);
  if (timeValidation.status) return timeValidation;
  return validation;
}

module.exports = {
  validateTransaction
}