import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import background from "../../../public/banner/login.jpg";
import google from "../../../public/icons/google-brands-solid.svg";
import { registerValidationSchema } from "../../utils/validation";
import {useDispatch} from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { googleRegister, register } from "../../features/User/auth/authAction";
import { auth, provider } from "../../config/firebase/firebase";
import { signInWithPopup } from "firebase/auth";

function Register() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function googleAuth() {
    signInWithPopup(auth, provider).then(async (data) => {
      console.log("google data");
      const res = await dispatch(googleRegister({ data: data.user }));
      console.log(res, "google register");

      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const result = await dispatch(
          register(values.name, values.email, values.password)
        );
        
        if (result.message === "email exists") {
          formik.setErrors({ email: "Email already exists" });
        } else {
          navigate("/otp");
        }
      } catch (error) {
        console.error("Error registering:", error);
      }
    },
  });

  const getBorderColor = (field) => {
    if (formik.touched[field] && formik.errors[field]) {
      return "border-red-500 focus:ring-red-500";
    } else if (formik.touched[field] && !formik.errors[field]) {
      return "border-green-500 focus:ring-green-500";
    } else {
      return "border-gray-300 focus:ring-btncolor";
    }
  };

  return (
    <main className="flex-grow bg-gray-100">
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex flex-col md:flex-row bg-black bg-opacity-50 w-full p-6 md:p-20">
          <div className="text-left text-white md:w-1/2 mr-auto my-auto">
            <h1 className="hidden text-2xl md:text-4xl md:flex font-bold mb-4">
              Unlock Your Ideal Stay at Hostel Haven
            </h1>
            <p className="hidden text-sm md:text-lg md:flex">
              Sign in with your phone number and discover unbeatable deals,
              member-only discounts, and perks from our trusted travel partners.
            </p>
          </div>
          <div className="bg-bgcolor shadow-md rounded-lg overflow-hidden p-6 md:p-10 w-full md:w-2/5 ml-auto my-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-btncolor">
              Create an account
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="block text-btncolor">Name</label>
                <input
                  className={`w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${getBorderColor(
                    "name"
                  )}`}
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-btncolor">Email Address</label>
                <input
                  className={`w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${getBorderColor(
                    "email"
                  )}`}
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="mb-4 relative">
                <label className="block text-btncolor">Password</label>
                <input
                  className={`w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${getBorderColor(
                    "password"
                  )}`}
                  type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                  placeholder="Enter Your Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye} // Change icon based on showPassword state
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-14 transform -translate-y-1/2 text-btncolor cursor-pointer"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <button
                className="w-full bg-btncolor text-white py-2 px-4 rounded"
              >
                Continue
              </button>
              <div className="mt-1 text-center">
                <p className="text-gray-800">
                  <Link to="/login">I already have an account</Link>
                </p>
              </div>
              <div className="text-center my-4">Or Continue With</div>
            </form>
            <div className="flex justify-center">
              <button
                className="bg-btncolor text-white py-2 px-4 rounded-3xl flex justify-center items-center"
                onClick={googleAuth}
              >
                <img
                  src={google}
                  alt="Google Icon"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
