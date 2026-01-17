const db = require("../models");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const { generateOTP } = require("../utils/otp");

const loginWithOtp = catchAsync(async (req, res, next) => {
  const { mobile, otp } = req.body;

  if (!mobile) {
    return next(new AppError("Mobile number is required", 400));
  }

  let tempUser = await db.TempUser.findOne({ where: { mobile } });

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
        mobile,
        otp: newOtp,
        otpExpiresAt,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "OTP sent successfully",
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
    mobile: tempUser.mobile,
  });
});

module.exports = {
  loginWithOtp,
};