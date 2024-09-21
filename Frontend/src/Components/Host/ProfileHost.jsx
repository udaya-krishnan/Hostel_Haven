import React, { useState } from "react";
// import ProfileSide from "../../Layout/UserLayout/ProfileSide";
import { accountEditSchema ,passwordSchema} from "../../utils/validation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import { selectUser } from "../../features/User/auth/authSelectors";
import { changePassword } from "../../features/User/auth/authAction";
import { Toaster, toast } from "sonner";
import HostProfile from "../../Layout/HostLayout/HostProfile";
import { selectHost } from "../../features/Host/auth/authSelectors";
import { editprofile, hostchangePassword } from "../../features/Host/auth/authAction";


function ProfileHost() {


    const [edit, setEdit] = useState(false);
  const [changepass, setPass] = useState(false);
  const hostData = useSelector(selectHost);
  const dispatch = useDispatch();
  const date = new Date(hostData.createdAt);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleSubmit = (values, { setSubmitting }) => {
    values.email = hostData.email;

    toast.promise( 
      new Promise((resolve, reject) => {
        dispatch(editprofile({ values }))
          .then(() => {
            resolve();
            setEdit(false);
          })
          .catch(() => {
            reject();
          })
          .finally(() => {
            setSubmitting(false);
          });
      }),
      {
        loading: "Updating profile...",
        success: "Profile updated successfully!",
        error: "Failed to update profile. Please try again.",
      }
    );
  };

  const handleCancel = () => {
    setEdit(false); 
    toast.info("Changes discarded.");
  };

  const handlePasswordChangeSubmit = async(values, { setSubmitting }) => {

    if (values.newPassword === values.confirmPassword) {
   const res= await dispatch(hostchangePassword(values.newPassword,hostData.email))
   if(res.message=="password change success"){
    toast.success("Password changed successfully!");
    setPass(false); 
   }else{
    console.log("password not changed");
    
   }
     
    } else {
     
      toast.error("Passwords do not match!"); 
    }
    setSubmitting(false);
  };















  return (
    <main className="flex-grow bg-gray-100 min-h-screen p-10">
    <Toaster />
    <div className="bg-white shadow-md rounded-lg p-8 flex flex-col lg:flex-row h-full">
      <HostProfile change={setPass} value={changepass} hostData={hostData} />

      <div className="w-full lg:w-2/3 lg:pl-10 mt-6 lg:mt-0">
        <h1 className="text-2xl font-bold mb-2">Hello, {hostData.name}</h1>

        {changepass ? (
          <Formik
            initialValues={{ newPassword: "", confirmPassword: "" }}
            validationSchema={passwordSchema} // Define a schema for password change
            onSubmit={handlePasswordChangeSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white p-8 rounded-lg shadow-md w-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="newPassword">
                    New Password
                  </label>
                  <Field
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                    placeholder="Enter new password"
                  />
                  <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                    placeholder="Confirm new password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="text-gray-600 mr-2"
                    onClick={() => setPass(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-btncolor text-white px-4 py-2 rounded-3xl"
                    disabled={isSubmitting}
                  >
                    Change
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : edit ? (
          <Formik
            initialValues={{
              name: hostData.name || "",
              mobile: hostData.mobile || "",
              about: hostData.about || "",
              location: hostData.location || "",
              work: hostData.work || "",
              pinCode: hostData.pinCode || "",
            }}
            validationSchema={accountEditSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white p-8 rounded-lg shadow-md w-full">
              {/* Name Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Mobile Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="mobile"
                >
                  Mobile <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  id="mobile"
                  name="mobile"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                  placeholder="Enter your mobile number"
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* About Textarea */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="about"
                >
                  About
                </label>
                <Field
                  as="textarea"
                  id="about"
                  name="about"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                  placeholder="Tell us about yourself"
                  rows="4"
                />
              </div>

              {/* Location Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="location"
                >
                  Location
                </label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                  placeholder="Enter your location"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    );
                  }}
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Work Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="work"
                >
                  Work
                </label>
                <Field
                  type="text"
                  id="work"
                  name="work"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                  placeholder="Enter your work"
                />
              </div>

              {/* Pin Code Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="pinCode"
                >
                  Pin Code <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                  placeholder="Enter your pin code"
                />
                <ErrorMessage
                  name="pinCode"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="mb-4 flex justify-between items-center">
                <span className="text-gray-400 text-xs">
                  All the required user information can be added here...
                </span>

                <div className="flex items-center space-x-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 384 512"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>

                  <button
                    type="button"
                    className="text-gray-600 mr-2"
                    onClick={() => {
                      setEdit(false)
                      handleCancel()
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-btncolor text-white pl-7 pr-7 py-2 rounded-3xl cursor-pointer"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
            )}
          </Formik>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-6">Joined in {formattedDate}</p>
            <button
              className="border border-btncolor text-btncolor py-2 px-4 rounded-md mb-6"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
            <hr className="mb-6" />
            {/* Other static user details */}
          </>
        )}
      </div>
    </div>
  </main>
  )
}

export default ProfileHost
