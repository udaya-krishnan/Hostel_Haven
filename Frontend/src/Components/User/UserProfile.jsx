import React, { useState } from "react";
import ProfileSide from "../../Layout/UserLayout/ProfileSide";
import { accountEditSchema, passwordSchema } from "../../utils/validation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/User/auth/authSelectors";
import { changePassword, editProfile } from "../../features/User/auth/authAction";
import { Toaster, toast } from "sonner";

function UserProfile() {
  const [edit, setEdit] = useState(false);
  const [changepass, setPass] = useState(false);
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const date = new Date(userData?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleSubmit = (values, { setSubmitting }) => {
    values.email = userData.email;

    toast.promise(
      new Promise((resolve, reject) => {
        dispatch(editProfile({ values }))
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

  const handlePasswordChangeSubmit = async (values, { setSubmitting }) => {
    if (values.newPassword === values.confirmPassword) {
      const res = await dispatch(changePassword(values.newPassword, userData.email));
      if (res.message === "password change success") {
        toast.success("Password changed successfully!");
        setPass(false);
      } else {
        console.log("password not changed");
      }
    } else {
      toast.error("Passwords do not match!");
    }
    setSubmitting(false);
  };

  return (
    <main className="flex-grow bg-gray-100 min-h-screen p-4 md:p-10">
      <Toaster />
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col lg:flex-row h-full">
        <ProfileSide change={setPass} value={changepass} userData={userData} />
        <div className="w-full lg:w-2/3 lg:pl-10 mt-4 lg:mt-0">
          <h1 className="text-2xl font-bold mb-2">Hello, {userData?.name}</h1>

          {changepass ? (
            <Formik
              initialValues={{ newPassword: "", confirmPassword: "" }}
              validationSchema={passwordSchema}
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
                name: userData.name || "",
                mobile: userData.mobile || "",
                about: userData.about || "",
                location: userData.location || "",
                work: userData.work || "",
                pinCode: userData.pinCode || "",
              }}
              validationSchema={accountEditSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="bg-white p-8 rounded-lg shadow-md w-full">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Additional Input Fields */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="mobile">
                      Mobile
                    </label>
                    <Field
                      type="text"
                      id="mobile"
                      name="mobile"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                      placeholder="Enter your mobile number"
                    />
                    <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="about">
                      About
                    </label>
                    <Field
                      component="textarea"
                      id="about"
                      name="about"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                      placeholder="Tell us about yourself"
                    />
                    <ErrorMessage name="about" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="location">
                      Location
                    </label>
                    <Field
                      type="text"
                      id="location"
                      name="location"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                      placeholder="Enter your location"
                    />
                    <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="work">
                      Work
                    </label>
                    <Field
                      type="text"
                      id="work"
                      name="work"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                      placeholder="Enter your work"
                    />
                    <ErrorMessage name="work" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="pinCode">
                      Pin Code
                    </label>
                    <Field
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-btncolor"
                      placeholder="Enter your pin code"
                    />
                    <ErrorMessage name="pinCode" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="mb-4 flex justify-between items-center">
                    <span className="text-gray-400 text-xs">
                      All the required user information can be added here...
                    </span>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        className="text-gray-600 mr-2"
                        onClick={() => {
                          setEdit(false);
                          handleCancel();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-btncolor text-white px-4 py-2 rounded-3xl cursor-pointer"
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
  );
}

export default UserProfile;