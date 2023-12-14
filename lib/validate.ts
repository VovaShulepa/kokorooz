interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues extends LoginValues {
  username: string;
  cpassword: string;
}

export default function loginValidate(values: LoginValues) {
  const errors: Partial<LoginValues> = {};

  if (!values.email) {
    errors.email = 'Введіть електронну пошту';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Неправильний формат електронної пошти';
  }

  // Валідація для пароля
  if (!values.password) {
    errors.password = 'Введіть пароль';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Мінімум 8 символів та максимум 20 символів';
  } else if (values.password.includes(' ')) {
    errors.password = 'Неправильний пароль';
  }

  return errors;
}

export function registerValidate(values: RegisterValues) {
  const errors: Partial<RegisterValues> = {};
  if (!values.username) {
    errors.username = "Введіть ім'я користувача";
  } else if (/\s/.test(values.username)) {
    errors.username = 'Пробіли не дозволені в імені користувача';
  }

  if (!values.email) {
    errors.email = 'Введіть електронну пошту';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Неправильний формат електронної пошти';
  }

  // Валідація для пароля
  if (!values.password) {
    errors.password = 'Введіть пароль';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Мінімум 8 символів та максимум 20 символів';
  } else if (values.password.includes(' ')) {
    errors.password = 'Неправильний пароль';
  }

  // Валідація для підтвердження пароля
  if (!values.cpassword) {
    errors.cpassword = 'Підтвердіть пароль';
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'Паролі не збігаються';
  } else if (values.cpassword.includes(' ')) {
    errors.cpassword = 'Неправильний ввід для паролю';
  }

  return errors;
}
