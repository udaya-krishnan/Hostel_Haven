import React from "react";
import background from "../../../public/banner/login.jpg";
import { passwordSchema } from "../../utils/validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { forgotPass } from "../../features/User/auth/authAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleSubmit = async(values) => {
    console.log("Form values:", values);
    const res=await dispatch(forgotPass(values))

    if(res.message=="password updated"){
      toast.success('Password updated', { hideProgressBar: true, className: 'custom-toast-success', autoClose: 2000 })
      setTimeout(()=>{
        navigate('/login')
      },2000)
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
              Forgot Password
            </h2>
            <Formik
              initialValues={{ newPassword: "", confirmPassword: "" }}
              validationSchema={passwordSchema}
              onSubmit={handleSubmit} // Pass the handleSubmit function here
            >
              {() => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-btncolor">New Password</label>
                    <Field
                      name="newPassword"
                      type="password"
                      placeholder="Enter Your New Password"
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-btncolor"
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-btncolor">Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Your Password"
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-btncolor"
                    />
                    <ErrorMessage
                      name="confirmPassword"
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

export default ForgotPassword;
