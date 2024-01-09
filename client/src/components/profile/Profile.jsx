import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import profile from '../../assets/user.png';
import toast, { Toaster } from 'react-hot-toast';

import { useFormik } from 'formik';
import { profileValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook';
import { useAuthStore } from '../../store/store';
import { updateUser } from '../../helper/helper';
const Profile = () => {
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      mobileNumber: apiData?.mobileNumber || '',
      email: apiData?.email || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || '',
      });
      console.log(values);
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: 'updating...',
        success: <b>Update Success</b>,
        error: <b>Update Failed</b>,
      });
    },
  });

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className="register-glass" style={{ width: '45%' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">PROFILE</h4>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || profile}
                  className="register-profile-img"
                  alt="profile"
                />
              </label>
              <input
                onChange={onUpload}
                className="input-file"
                type="file"
                name="profile"
                id="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-2 ">
              <div className="flex gap-10 w-3/4">
                <input
                  {...formik.getFieldProps('firstName')}
                  className="textbox-input mb-4"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  {...formik.getFieldProps('lastName')}
                  className="textbox-input mb-4"
                  type="text"
                  placeholder="Last Name"
                />
              </div>

              <div className="flex gap-10 w-3/4">
                <input
                  {...formik.getFieldProps('email')}
                  className="textbox-input mb-4"
                  type="text"
                  placeholder="Email"
                />
                <input
                  {...formik.getFieldProps('mobileNumber')}
                  className="textbox-input mb-4"
                  type="text"
                  placeholder="Mobile Number"
                />
              </div>

              <input
                {...formik.getFieldProps('address')}
                className="textbox-input mb-4"
                type="text"
                placeholder="Address"
              />

              <button type="submit" className="btn">
                Update
              </button>
            </div>
            <div className=" text-sm text-center py-4">
              <span className="text-gray-500 py-4">
                <button className="text-red-500" onClick={userLogout} to="/">
                  Log Out
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
