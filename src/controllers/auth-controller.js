const db = require("../models");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const { generateOTP, sendOTPToEmail } = require("../utils/otp");

const loginWithOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  let tempUser = await db.TempUser.findOne({ where: { email } });

    //SEND OTP
    if (!otp) {
    const newOtp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

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

    return res.status(200).json({
      status: "success",
      message: "OTP sent successfully to your email",
    });
  }

    //VERIFY OTP
    if (!tempUser) {
    return next(new AppError("No OTP request found", 404));
  }

  if (tempUser.otp !== otp) {
    return next(new AppError("Invalid OTP", 400));
  }

  if (tempUser.otpExpiresAt < new Date()) {
    return next(
      new AppError("OTP expired. Please request again.", 400)
    );
  }

 tempUser.isVerified = true;
  await tempUser.save();

  res.status(200).json({
    status: "success",
    message: "OTP verified successfully.",
    mobile: tempUser.email,
  });
});

module.exports = {
  loginWithOtp,
};