function generateTransactionId() {
  // You can customize the format and length of the transaction ID
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 100000);

  return `TXN-${timestamp}-${randomPart}`;
}
module.exports = generateTransactionId;
