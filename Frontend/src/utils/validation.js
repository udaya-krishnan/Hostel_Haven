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



export const loginHostSchema = Yup.object().shape({
  email: Yup.string()
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


export const emailVerifySchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export  const passwordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref('newPassword')], "Passwords must match"),
});



export const adminvalidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
     
});


export const accountEditSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  mobile: Yup.string().required('Number is required'),
  about: Yup.string(),
  location: Yup.string(),
  work: Yup.string(),
});
