import React, { useState } from "react";
import ProfileSide from "../../Layout/UserLayout/ProfileSide";
import { accountEditSchema } from "../../utils/validation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/User/auth/authSelectors";
import { editprofile } from "../../features/User/auth/authAction";

function UserProfile() {
  const [edit, setEdit] = useState(false);
  const [changepass, setPass] = useState(false);
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const date = new Date(userData.createdAt);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  // console.log(userData);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Submitted:", values);

    values.email = userData.email;

    dispatch(editprofile({ values }));

    setSubmitting(false);
    setEdit(false);
  };

  return (
    <main className="flex-grow bg-gray-100 min-h-screen p-10">
      <div className="bg-white shadow-md rounded-lg p-8 flex flex-col lg:flex-row h-full">
        {/* Left Side - Profile Details */}
        <ProfileSide change={setPass} value={changepass} userData={userData} />

        {/* Right Side - Main Profile Info */}
        <div className="w-full lg:w-2/3 lg:pl-10 mt-6 lg:mt-0">
          <h1 className="text-2xl font-bold mb-2">Hello,{userData.name}</h1>

          {changepass === true ? (
            <form className="bg-white p-8 rounded-lg shadow-md w-full">
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  New Password
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                  placeholder="Enter your name"
                />
              </div>

              {/* Number Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="number"
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  id="number"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                  placeholder="Enter your number"
                />
              </div>
              <div className="flex justify-end  space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-2 text-gray-400"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>

                <button className="text-gray-600 mr-2">Cancel</button>
                <button className="bg-btncolor text-white pl-7 pr-7 py-2 rounded-3xl">
                  Change
                </button>
              </div>
            </form>
          ) : edit === false ? (
            <>
              <p className="text-sm text-gray-600 mb-6">
                Joined in {formattedDate}
              </p>
              <button
                className="border border-btncolor text-btncolor py-2 px-4 rounded-md mb-6"
                onClick={() => setEdit(!edit)}
              >
                Edit Profile
              </button>
              <hr className="mb-6" />
              <div className="flex items-center">
                <span className="bg-btncolor text-white py-1 px-4 rounded-lg text-sm mr-2">
                  JOHN24
                </span>
                <button className="text-btncolor">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M7.707 14.707a1 1 0 01-1.414-1.414L11.586 8l-5.293-5.293a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6z" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <Formik
            initialValues={{
              name: userData.name || "",
              mobile: userData?.mobile || "",
              about: userData?.about || "",
              location: userData?.location || "",
              work: userData?.work || "",
              pinCode: userData?.pinCode || "", // Adding pinCode to initial values
            }}
            validationSchema={accountEditSchema}
            onSubmit={handleSubmit} // Passing the handleSubmit function
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
                      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
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
                      onClick={() => setEdit(false)}
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
          
          )}
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
