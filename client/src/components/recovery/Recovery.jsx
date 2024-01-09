import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../../store/store';
import { generateOtp, verifyOtp } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';
import './Recovery.css';
import profile from '../../assets/user.png';

const Recovery = () => {
  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();
  console.log(username);
  useEffect(() => {
    generateOtp(username).then(OTP => {
      console.log(OTP);
      if (OTP) {
        return toast.success('OTP has been sent to your registered email');
      }
      return toast.error('Invalid Request');
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOtp({ username, code: OTP });
      if (status === 201) {
        toast.success('Verify Successfully');
        return navigate('/reset');
      } else {
        return toast.error('Invalid OTP');
      }
    } catch (error) {
      return error;
    }
  }

  function resendOTP() {
    let resendPromise = generateOtp(username);
    toast.promise(resendPromise, {
      loading: 'Sending ... ',
      success: 'Verify Successfully',
      error: 'Could Not Send OTP',
    });
    resendPromise.then(OTP => {
      console.log(OTP);
    });
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Forgot Password</h4>
            <p className="py-2 text-xl w-3/4 text-center text-gray-500">
              Enter OTP to Recover Password
            </p>
          </div>
          <form className="pt-20" onSubmit={onSubmit}>
            <p className=" text-sm text-gray-500 px-14 pb-3">
              Enter 6 digit OTP sent to your mail
            </p>
            <div className="textbox flex flex-col items-center ">
              <input
                className="textbox-input mb-4"
                type="text"
                placeholder="OTP"
                onChange={e => setOTP(e.target.value)}
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
          <div className=" text-sm text-center py-4">
            <span className="text-gray-500 py-4">
              Didn't receive otp ,
              <button onClick={resendOTP} className="  text-red-500">
                resend OTP
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
