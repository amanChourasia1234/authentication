import { toast } from 'react-hot-toast';
import { authenticate } from './helper';
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error('User does not exist');
    }
  }

  return errors;
}

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

export async function resetPasswordValidate(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirmPassword) {
    errors.exist = toast.error('Password does not match');
  }

  return errors;
}
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

export async function profileValidation(values) {
  const errors = emailVerify({}, values);

  // mobileVerify(errors, values);
  return errors;
}
function firstNameVerify(error = {}, values) {
  if (!values.firstName) {
    error.firstName = toast.error('First Name Required');
  } else if (values.firstName.includes(' ')) {
    error.firstName = toast.error('Invalid first Name');
  }
}
function addressVerify(error = {}, values) {
  if (!values.firstName) {
    error.address = toast.error('Address Required');
  }
}
function lastNameVerify(error = {}, values) {
  if (!values.lastName) {
    error.lastName = toast.error('Last Name Required');
  } else if (values.lastName.includes(' ')) {
    error.lastName = toast.error('Invalid last Name');
  }
}
function mobileVerify(error = {}, values) {
  if (!values.mobileNumber) {
    error.mobileNumber = toast.error('Mobile Number Required');
  } else if (values.mobileNumber.includes(' ')) {
    error.mobileNumber = toast.error('Invalid Mobile Number');
  } else if (values.mobileNumber.length !== 10) {
    error.mobileNumber = toast.error('Invalid Mobile Number');
  }
}
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username Required');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid Username');
  }
  return error;
}

function passwordVerify(error = {}, values) {
  const specialChar = /[`!@#$%^&*()_+\[\]{};'"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error('Password Required');
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Invalid Password');
  } else if (values.password.length < 5) {
    error.password = toast.error(
      'Password Length must be greater than 5 character'
    );
  } else if (!specialChar.test(values.password)) {
    error.password = toast.error(
      'Password Must contain atleast one special character'
    );
  }
}

function emailVerify(error = {}, values) {
  const emailSymbol = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!values.email) {
    error.email = toast.error('Email Required');
  } else if (values.email.includes(' ')) {
    error.email = toast.error('Invalid Email');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error('Invalid Email Address');
  }
}
