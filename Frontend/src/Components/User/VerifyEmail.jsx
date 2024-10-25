import React, { useState } from "react";
import background from "../../../public/banner/login.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailVerifySchema } from "../../utils/validation";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../features/User/auth/authAction";
import { useNavigate } from "react-router-dom";

function EmailVerify() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleSubmit = async(values) => {
      try {
        console.log(values);
        const res=await  dispatch(verifyEmail(values.email))
 
        if(res.message==="OTP sent successfully"){
         navigate('/otp')
        }
      } catch (error) {
        if(error.response.status===404){
          toast.error('User Not Found', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 })
         }else{
          toast.error("Something went wrong on our end. Please try again later.")
         }
      }
     
      // Handle form submission
    };
  
    return (
      <main className="flex-grow bg-gray-100">
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="text-sm font-medium"
        style={{ width: "350px", top: "20px", right: "20px" }}
      />
        <div
          className="h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex flex-col md:flex-row bg-black bg-opacity-50 w-full h-full p-6 md:p-20">
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
                Verify Your Email
              </h2>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={emailVerifySchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="mb-4">
                      <label className="block text-btncolor">Enter Your Email</label>
                      <Field
                        name="email"
                        type="text"
                        placeholder="Enter Your Email"
                        className={`w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-btncolor ${
                          errors.email && touched.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-btncolor text-white py-2 px-4 rounded cursor-pointer"
                    >
                      Continue
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  export default EmailVerify;