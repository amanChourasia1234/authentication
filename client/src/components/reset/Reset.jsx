import React from "react";
import { Link } from "react-router-dom";
import "./Reset.css";
import profile from "../../assets/user.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../../helper/validate";
const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className="glass" style={{ width: "40%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset Password</h4>
            <p className="py-2 text-xl w-3/4 text-center text-gray-500">
              Enter New Password
            </p>
          </div>
          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center ">
              <input
                {...formik.getFieldProps("password")}
                className="textbox-input mb-4"
                type="password"
                placeholder="Password"
              />
              <input
                {...formik.getFieldProps("confirmPassword")}
                className="textbox-input mb-4"
                type="password"
                placeholder="Confirm Password"
              />
              <button type="submit" className="btn">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
