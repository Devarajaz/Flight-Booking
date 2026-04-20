const db = require("../models");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const { generateOTP, sendOTPToEmail } = require("../utils/otp");
const jwt = require("jsonwebtoken");

const sendOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  let tempUser = await db.TempUser.findOne({ where: { email } });

  const newOtp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

  if (tempUser) {
    tempUser.otp = newOtp;
    tempUser.otpExpiresAt = otpExpiresAt;
    tempUser.isVerified = false;
    await tempUser.save();
  } else {
    tempUser = await db.TempUser.create({
      email,
      otp: newOtp,
      otpExpiresAt,
    });
  }

  await sendOTPToEmail(email, newOtp);

  res.status(200).json({
    status: "success",
    message: "OTP sent successfully",
  });
});

const verifyOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new AppError("Email and OTP are required", 400));
  }

  const tempUser = await db.TempUser.findOne({ where: { email } });

  if (!tempUser) {
    return next(new AppError("No OTP request found", 404));
  }

  if (tempUser.otp !== otp) {
    return next(new AppError("Invalid OTP", 400));
  }

  if (tempUser.otpExpiresAt < new Date()) {
    return next(new AppError("OTP expired", 400));
  }

  tempUser.isVerified = true;
  await tempUser.save();

  // 🔥 Generate real JWT here
  const token = jwt.sign(
    { email: tempUser.email },
    "your-secret-key",
    { expiresIn: "1h"}
  );

  res.status(200).json({
    status: "success",
    message: "OTP verified successfully",
    token,
    email: tempUser.email, // fix naming
  });
});


module.exports = {
  sendOtp,
  verifyOtp
};