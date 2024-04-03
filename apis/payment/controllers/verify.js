const crypto = require("crypto");
async function Verify(req, res) {
  try {
    const { razorpay_orderID, razorpay_paymentID, razorpay_signature } =
      req.body;
    const sign = razorpay_orderID + "|" + razorpay_paymentID;
    const resultSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");
    console.log(razorpay_signature);
    console.log(resultSign);
    console.log("Hello");
    if (razorpay_signature == resultSign) {
      console.log("success");
      return res.status(200).json({ message: "Payment verified successfully" });
    }
  } catch (error) {
    console.log("error:");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
module.exports = Verify;
