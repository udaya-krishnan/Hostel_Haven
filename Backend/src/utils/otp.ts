// utils/otp.ts
import otpGenerator from 'otp-generator';

// Function to generate OTP
export const generateOtp = (): string => {
  return otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
