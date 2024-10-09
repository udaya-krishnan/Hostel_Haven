import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginHostSchema } from "../../utils/validation"; 
import background from "../../../public/banner/businessman.jpeg";
import { useDispatch } from "react-redux";
import { hostLogin } from "../../features/Host/auth/authAction";

function LoginHost() {
  
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleSubmit = async(values) => {
    console.log(values);
   const res = await dispatch(hostLogin(values.email, values.password,toast));
   console.log(res);
   
   if(res==="otp send success"){
    navigate('/host/otp')
   }
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
        className="h-screen flex justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex flex-col md:flex-row bg-black bg-opacity-50 w-full h-full p-6 md:p-20">
          <div className="absolute top-0 left-0 p-6 md:p-10">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white">
              HOSTEL HAVEN
            </h1>
          </div>

          <div className="text-left text-white md:w-1/2 mr-auto my-auto flex flex-col justify-center h-full">
            <h1 className="text-2xl md:text-4xl font-extrabold mb-2">
              Growing your
            </h1>
            <p className="text-sm md:text-2xl">business made easy</p>
          </div>

          <div className="bg-bgcolor shadow-md rounded-lg overflow-hidden p-6 md:p-10 w-full md:w-2/5 ml-auto my-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-btncolor">
              Enter Your Details
            </h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginHostSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-btncolor">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className={`w-full mt-2 px-2 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-btncolor ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter Your Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-btncolor">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={`w-full mt-2 px-2 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-btncolor ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter Your Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-gray-800">
                      <Link to="/register" className="hover:underline">
                        I don't have an account
                      </Link>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-btncolor text-white py-2 px-4 rounded mt-4"
                  >
                    Login
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

export default LoginHost;
