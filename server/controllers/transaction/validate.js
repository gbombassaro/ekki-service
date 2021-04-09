const validateTransaction = (balance, value) => {
  const result = balance - value;
  if (value > balance) return {success: false, message: 'Saldo insuficiente.'}
  return {success: true, balance: result};
}

module.exports = {
  validateTransaction
}