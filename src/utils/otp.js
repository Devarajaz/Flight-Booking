const { sendOTPEmail } = require("./mail");
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPToEmail = async (email, otp) => {
  await sendOTPEmail(email, otp);
};

module.exports = {
  generateOTP,
  sendOTPToEmail,
};