import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './password.css';
import profile from '../../assets/user.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../../helper/validate';
import useFetch from '../../hooks/fetch.hook';
import { useAuthStore } from '../../store/store';
import { verifyPassword } from '../../helper/helper';
const Password = () => {
  const { username } = useAuthStore(state => state.auth);

  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values);
      let loginPromise = verifyPassword({
        username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: 'logging',
        success: <b>Login Success</b>,
        error: <b>Login Failed</b>,
      });
      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile');
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              Hello {apiData?.firstName || apiData?.username}
            </h4>
            <p className="py-2 text-xl w-3/4 text-center text-gray-500">
              Explore more by connecting with us
            </p>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || profile}
                className="profile-img"
                alt="profile"
              />
            </div>
            <div className="textbox flex flex-col items-center ">
              <input
                {...formik.getFieldProps('password')}
                className="textbox-input mb-4"
                type="password"
                placeholder="Password"
              />
              <button type="submit" className="btn">
                Login
              </button>
            </div>
            {/* <div className=" text-sm text-center py-4">
              <span className="text-gray-500 py-4">
                Forgot Password ,
                <Link className="  text-red-500" to="/recovery">
                  <> </>recover Here
                </Link>
              </span>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
