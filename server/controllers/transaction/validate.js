const {subMinutes, isAfter} = require('date-fns');

//Validate cancel latest transaction
const cancelLatestTransaction = (originData, destinyData, value) => {
  const transactionHistory = originData.transactionHistory;
  if (transactionHistory.length < 1) return {status: false};
  const latestTransaction = transactionHistory[transactionHistory.length - 1];
  const latestTransactionId = latestTransaction.id;
  const latestTransactionValue = latestTransaction.value;
  const latestTransactionTime = transactionHistory[transactionHistory.length - 1].processedAt;
  const now = new Date();
  const limit = subMinutes(now, 2);
  const cancelZone = isAfter(latestTransactionTime, limit);
  if (cancelZone && value === latestTransactionValue) return {
    status: 'cancelLatest',
    transactionId: latestTransactionId,
    originBalance: originData.balance,
    originCredit: originData.credit,
    destinyBalance: destinyData.balance,
    destinyCredit: destinyData.credit,
  }
  return {status: false};
}

//Validate transaction using credit
const validateOriginAndDestiny = (originData, destinyData, value) => {
  
  let status = true;
  let originBalance = originData.balance;
  let originCredit = originData.credit;
  let originFinalBalance = originBalance - value;
  //check credit operation for origin account
  if (originFinalBalance < 0) {
    const {credit, creditLimit} = originData;
    const usedCredit = credit + (originFinalBalance * -1);
    if (usedCredit > creditLimit) return {
      status: false,
      message: 'Saldo insuficiente.',
    }
    status = 'credit';
    originBalance = originFinalBalance;
    originCredit = usedCredit;
  } else {
    originBalance = originFinalBalance;
  }

  let destinyBalance = destinyData.balance;
  let destinyCredit = destinyData.credit;
  //check credit usage for destiny account
  if (destinyBalance < 0) {
    const credit = destinyData.credit;
    const finalCredit = credit - value;
    if (finalCredit < 0) destinyCredit = 0;
    else destinyCredit = finalCredit;
    destinyBalance = value - credit;
  } else {
    destinyBalance = destinyBalance + value;
  }

  return {
    status,
    originBalance,
    originCredit,
    destinyBalance,
    destinyCredit,
  }
}

//Main validation method
const validateTransaction = (originData, destinyData, value) => {
  const timeValidation = cancelLatestTransaction(originData, destinyData, value);
  const validation = validateOriginAndDestiny(originData, destinyData, value);
  if (timeValidation.status) return timeValidation;
  return validation;
}

module.exports = {
  validateTransaction
}