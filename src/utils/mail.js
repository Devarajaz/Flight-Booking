const nodemailer = require("nodemailer");

const sendOTPEmail = async (toEmail, otp) => {
  try {
    // Create transporter
  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true = SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
  },
});

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Your OTP for Flight Booking App",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${toEmail}: ${otp}`);
  } catch (err) {
    console.error("Error sending OTP email:", err.message);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = { sendOTPEmail };
