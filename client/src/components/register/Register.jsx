import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import profile from '../../assets/user.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import { registerUser } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || '' });
      console.log(values);
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: <b>Creating ... </b>,
        success: <b>Register Success</b>,
        error: <b>Register failed</b>,
      });

      registerPromise.then(() => {
        navigate('/');
      });
    },
  });

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className="register-glass" style={{ width: '45%' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">REGISTER</h4>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || profile}
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

            <div className="textbox flex flex-col items-center ">
              <input
                {...formik.getFieldProps('email')}
                className="textbox-input mb-4"
                type="text"
                placeholder="Email"
              />
              <input
                {...formik.getFieldProps('username')}
                className="textbox-input mb-4"
                type="text"
                placeholder="Username"
              />
              <input
                {...formik.getFieldProps('password')}
                className="textbox-input mb-4"
                type="password"
                placeholder="Password"
              />

              <button type="submit" className="btn">
                Register
              </button>
            </div>
            <div className=" text-sm text-center py-4">
              <span className="text-gray-500 py-4">
                Already Registered ,
                <Link className="  text-red-500" to="/">
                  <> </>login Here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
