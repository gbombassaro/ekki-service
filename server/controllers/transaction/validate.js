const {subMinutes, isAfter} = require('date-fns');

//Validate cancel latest transaction
const cancelLatestTransaction = (originData, value) => {
  const transactionHistory = originData.transactionHistory;
  const latestTransaction = transactionHistory[transactionHistory.length - 1];
  const latestTransactionValue = latestTransaction.value;
  const latestTransactionTime = transactionHistory[transactionHistory.length - 1].processedAt;
  const now = new Date();
  const limit = subMinutes(now, 2);
  const cancelZone = isAfter(latestTransactionTime, limit);
  if (cancelZone && value === latestTransactionValue) return {status: false}
  return {status: true};
}

//Validate transaction using credit
const checkAvailableCredit = (originData, value) => {
  const availableCredit = originData.credit;
  const finalCredit = availableCredit - value;
  if (finalCredit < 0) return {status: false};
  return {status: true, balance: value, credit: finalCredit};
}

//Main method
const validateTransaction = (originData, value) => {
  const {balance} = originData;
  const finalBalance = balance - value;

  const timeValidation = cancelLatestTransaction(originData, value);
  if (!timeValidation.status) return {
    success: 'pending',
    balance: finalBalance
  }

  if (value > balance) {
    const creditValidation = checkAvailableCredit(originData, finalBalance);
    if (!creditValidation) return {
      success: false,
      message: 'Saldo insuficiente.',
      balance: finalBalance
    }
    return {
      success: 'credit',
      balance: creditValidation.balance,
      credit: creditValidation.credit
    }
  }
  return {
    success: true,
    balance: finalBalance
  };
}

module.exports = {
  validateTransaction
}