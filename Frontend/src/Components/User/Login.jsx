import React, { useEffect } from "react";
import background from "../../../public/banner/login.jpg";
import google from "../../../public/icons/google-brands-solid.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import { loginschema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { login ,googleRegister} from "../../features/User/auth/authAction";
import 'react-toastify/dist/ReactToastify.css'; // Make sure you import the CSS for toastify
import { selectToken } from "../../features/User/auth/authSelectors";
import { auth,provider } from "../../config/firebase/firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const token =useSelector(selectToken)



 function googleAuth(){
  signInWithPopup(auth,provider).then(async(data)=>{
    console.log("google data");
   const res=await dispatch(googleRegister({data:data.user}))
   console.log(res,"google register");

   if(res.meta.requestStatus==="fulfilled"){
    navigate('/')
   } 
  })
}

  useEffect(()=>{
    console.log("not render");
    
    if(token!==null){
      console.log("token",token);
      navigate('/')
    }else{
      console.log(token);
      
    }
  },[token])

  const handleSubmit = async (values) => {
    console.log(values);
    await dispatch(login({ email: values.email, password: values.password, toast }));
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
        className="text-sm font-medium" // Custom class for styling
        style={{ width: "350px", top: "20px", right: "20px" }} // Inline styles
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
              Login Your Account
            </h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginschema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-btncolor">Email Address</label>
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
                  <div className="mb-4">
                    <label className="block text-btncolor">Password</label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter Your Password"
                      className={`w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-btncolor ${
                        errors.password && touched.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-btncolor text-white py-2 px-4 rounded"
                  >
                    Login
                  </button>
                 
                </Form>
              )}
            </Formik>
            <div className="mt-1 text-center">
              <p className="text-gray-800">
                <Link to="/register">I don't have a account</Link>
              </p>
            </div>
            <div className="text-center my-4">Or Continue With</div>
            <div className="flex justify-center">
              <button className="bg-btncolor text-white py-2 px-4 rounded-3xl flex justify-center items-center"
              onClick={googleAuth}>
                <img src={google} alt="Google Icon" className="w-5 h-5 mr-2" />
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
