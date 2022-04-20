export const formatCurrency = quantity => {
  return quantity.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
