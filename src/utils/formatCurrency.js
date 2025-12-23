const formatCurrency = (amount) => {
  return `₹${Number(amount).toFixed(2)}`
}

export default formatCurrency
