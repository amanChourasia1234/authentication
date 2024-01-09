import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './username.css';
import profile from '../../assets/user.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../../helper/validate';
import { useAuthStore } from '../../store/store';
export default function Username() {
  const setUsername = useAuthStore(state => state.setUsername);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setUsername(values.username);
      navigate('/password');
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">WELCOME BACK</h4>
            <p className="py-2 text-xl w-3/4 text-center text-gray-500">
              Explore more by connecting with us
            </p>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={profile} className="profile-img" alt="profile" />
            </div>
            <div className="textbox flex flex-col items-center ">
              <input
                {...formik.getFieldProps('username')}
                className="textbox-input mb-4"
                type="text"
                placeholder="Username"
              />
              <button type="submit" className="btn">
                Lets Go
              </button>
            </div>
            <div className=" text-sm text-center py-4">
              <span className="text-gray-500 py-4">
                Not a Member ,
                <Link className="text-red-500" to="/register">
                  <> </>Register Here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// export default Username;
