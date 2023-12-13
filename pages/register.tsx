import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { HiFingerPrint } from 'react-icons/hi';
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate';
import { useRouter } from 'next/router';
import { Section } from '@/components/common/Section';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded-md shadow-lg relative">
        <span
          className="absolute top-0 right-0 p-4 cursor-pointer text-2xl"
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const Register: React.FC = () => {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values: Record<string, string>) {
    console.log('Значення форми:', values);

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    try {
      const res = await fetch('/api/auth/signup', options);
      console.log('HTTP статус:', res.status);

      const data = await res.json();

      console.log('Дані відповіді:', data);

      if (data.error) {
        console.error('Помилка сервера:', data.error);
      } else if (data.message) {
        console.error('Помилка реєстрації:', data.message);
      }
      if (data.status) {
        console.log('Реєстрація пройшла успішно:', data.user);

        setSuccessModalOpen(true);
      }
    } catch (error) {
      console.error('Помилка під час реєстрації:', error);
    }
  }

  const redirectToUserPage = () => {
    // Close the modal
    setSuccessModalOpen(false);
    // Redirect to the user's page
    router.push('/user');
  };

  return (
    <>
      <Head>
        <title>Реєстрація</title>
      </Head>

      <Section className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
          <h1 className="text-gray-800 text-4xl font-bold mb-6 text-center">
            Реєстрація
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Знайди свою любов ❤️ &#128152; <br />
            Зареєструйся та отримай $2 на свою картку. <br />
            Запроси друга та отримай $1.
          </p>

          {/* form */}
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm text-gray-900 mb-1">
                Ім`я користувача
              </label>
              <input
                id="username"
                autoComplete="username"
                type="text"
                className="p-2 border rounded-md text-black"
                {...formik.getFieldProps('username')}
              />
              {formik.errors.username && formik.touched.username && (
                <span className="text-rose-500">{formik.errors.username}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm text-gray-900 mb-1">
                Електронна пошта
              </label>
              <input
                id="email"
                autoComplete="email"
                type="email"
                className="p-2 border rounded-md text-black"
                {...formik.getFieldProps('email')}
              />
              {formik.errors.email && formik.touched.email && (
                <span className="text-rose-500">{formik.errors.email}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm text-gray-900 mb-1">
                Пароль
              </label>
              <input
                id="password"
                type={`${show.password ? 'text' : 'password'}`}
                className="p-2 border rounded-md text-black"
                {...formik.getFieldProps('password')}
              />
              <span
                className="flex items-center p-2 cursor-pointer"
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                <HiFingerPrint size={25} />
              </span>
              {formik.errors.password && formik.touched.password && (
                <span className="text-rose-500">{formik.errors.password}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="cpassword" className="text-sm text-gray-900 mb-1">
                Підтвердіть пароль
              </label>
              <input
                id="cpassword"
                type={`${show.cpassword ? 'text' : 'password'}`}
                className="p-2 border rounded-md text-black"
                {...formik.getFieldProps('cpassword')}
              />
              <span
                className="flex items-center p-2 cursor-pointer"
                onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
              >
                <HiFingerPrint size={25} />
              </span>
              {formik.errors.cpassword && formik.touched.cpassword && (
                <span className="text-rose-500">{formik.errors.cpassword}</span>
              )}
            </div>

            {/* login buttons */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Зареєструватися
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-gray-400 ">
            Вже маєте обліковий запис?{' '}
            <Link href="/login" className="text-blue-700 hover:text-blue-400">
              Увійти
            </Link>
          </p>
        </div>
      </Section>

      {/* Модальне вікно успішної реєстрації */}
      {isSuccessModalOpen && (
        <Modal onClose={redirectToUserPage}>
          <p className="text-2xl pt-7 font-bold text-orange-600 mb-4 text-center">
            Вітаємо! Ви успішно зареєструвалися! &#127881;
          </p>
          <button
            onClick={redirectToUserPage}
            className="w-full bg-blue-500 p-2 rounded-md hover:bg-blue-600"
          >
            OK
          </button>
          ``
        </Modal>
      )}
    </>
  );
};

export default Register;
