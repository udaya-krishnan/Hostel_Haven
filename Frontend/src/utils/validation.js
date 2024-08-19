import * as Yup from "yup"

export const registerValidationSchema=Yup.object().shape({
    name:Yup.string().trim()
    .required("Username is required")
    .min(3,'Username must be at least 3 characters')
    .max(20,"Username can't be longer than 20 characters")
    .trim('User name'),
    email:Yup.string().trim()
    .required("Email is required")
    .email('Email is invalid'),
    password:Yup.string().trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password can't be longer than 32 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
})

export const otpSchema = Yup.object().shape({
  otp: Yup.string().trim()
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

export const loginschema = Yup.object({
  email: Yup.string().trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password can't be longer than 32 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
});