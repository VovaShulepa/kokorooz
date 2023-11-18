export default function login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Обов'язкове поле";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Неправильний email";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Обов'язкове поле";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Мінімум 8 символів та не більше 20-ти";
  } else if (values.password.includes(" ")) {
    errors.password = "Неправильний пароль";
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = "Обов'язкове поле";
  } else if (/\s/.test(values.username)) {
    errors.username = "Пробіли не дозволені в імені користувача";
  }

  if (!values.email) {
    errors.email = "Обов'язкове поле";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Неправильний email";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Обов'язкове поле";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Мінімум 8 символів та не більше 20-ти";
  } else if (values.password.includes(" ")) {
    errors.password = "Неправильний пароль";
  }

  // validate confirm password
  if (!values.cpassword) {
    errors.cpassword = "Обов'язкове поле";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Пароль не спіпадає...!";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Неправильно введений пароль";
  }

  return errors;
}
