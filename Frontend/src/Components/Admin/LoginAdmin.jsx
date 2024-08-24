import React from 'react'
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import{adminvalidationSchema} from '../../utils/validation'
import { loginadmin } from '../../features/Admin/auth/authAction';
import { useNavigate } from 'react-router-dom';

function LoginAdmin() {
  
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async(values, { setSubmitting }) => {
    console.log("Form Data:", values);
 
   const res=await dispatch(loginadmin({email:values.email,password:values.password}));
   console.log(res,"respones");
   
   if(res.payload.message==="success"){
    console.log("sucess");
    
    navigate('/admin/dashboard')
   }
    setSubmitting(false);
  };


 
  return (
    <main className="flex-grow bg-bgcolor h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-headercolor text-center">
          Admin Login
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={adminvalidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-btncolor mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-btncolor"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-6">
                <label className="block text-btncolor mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-btncolor"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-btncolor text-white py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}

export default LoginAdmin
