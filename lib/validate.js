export default function login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter your Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Enter your Password";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Minimum 8 characters and maximum 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = "Enter your username";
  } else if (/\s/.test(values.username)) {
    errors.username = "Spaces are not allowed in the Username";
  }

  if (!values.email) {
    errors.email = "Enter your Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Enter your Password";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Minimum 8 characters and maximum 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  // validate confirm password
  if (!values.cpassword) {
    errors.cpassword = "Confirm your password";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Passwords do not match";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid input for the Password";
  }

  return errors;
}