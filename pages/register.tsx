import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { HiAtSymbol, HiEye, HiEyeOff } from 'react-icons/hi';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import { registerValidate } from '../lib/validate';
import { Section } from '@/components/common/Section';
import { Title } from '@/components/typography/Title';
import { Paragraph } from '@/components/typography/Paragraph';
import data from '@/data/registerData.json';

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
      <Section className="pt-40">
        <div className="container flex notXl:flex-col justify-around">
          <div>
            <Title tag="h1" className="mb-4 text-center">
              Умови партнерства
            </Title>

            <ul className="list-disc ml-4 flex flex-col gap-4">
              {data.map((item, index) => (
                <li key={index}>
                  <Paragraph size="list" className="max-w-[600px]">
                    <strong className="text-yellow-500">{item.title}</strong>{' '}
                    {item.content}
                  </Paragraph>
                </li>
              ))}
              <p className="max-w-[600px] mt-8 text-base text-gray-200 text-center">
                Додаток ще у тестовому режимі, тому всі ваші побажання чи
                виправлення можуть з`явитись ближчим часом
              </p>
            </ul>
          </div>

          {/* form */}
          <div className="notXl:mt-16 xl:ml-32">
            <form
              className="flex flex-col gap-12 xl:w-[400px]"
              onSubmit={formik.handleSubmit}
            >
              {/* Login */}
              <div className="flex flex-col relative">
                <input
                  id="username"
                  autoComplete="username"
                  type="text"
                  placeholder={
                    formik.errors.username && formik.touched.username
                      ? formik.errors.username
                      : 'Логін'
                  }
                  className={`input py-3 px-6 text-xl text-yellow-300 border-none w-full rounded-full focus:ring-transparent bg-transparent ${
                    formik.errors.username && formik.touched.username
                      ? 'input-error placeholder-red'
                      : 'border-none'
                  }`}
                  {...formik.getFieldProps('username')}
                />
                {formik.errors.username && formik.touched.username && (
                  <span className="absolute text-rose-300 -bottom-8 left-4">
                    {formik.errors.username}
                  </span>
                )}
              </div>

              {/* Електронна пошта */}
              <div className="flex flex-col relative">
                <input
                  id="email"
                  autoComplete="email"
                  type="email"
                  placeholder={
                    formik.errors.email && formik.touched.email
                      ? formik.errors.email
                      : 'Email'
                  }
                  className={`input py-3 px-6 text-xl text-yellow-300 border-none w-full rounded-full focus:ring-transparent bg-transparent ${
                    formik.errors.email && formik.touched.email
                      ? 'input-error placeholder-red'
                      : 'border-none'
                  }`}
                  {...formik.getFieldProps('email')}
                />
                <HiAtSymbol
                  className="text-yellow-300 absolute right-6 top-1/2 transform -translate-y-1/2"
                  size={20}
                />
                {formik.errors.email && formik.touched.email && (
                  <span className="absolute text-rose-300 -bottom-8 left-4">
                    {formik.errors.email}
                  </span>
                )}
              </div>

              {/* Пароль */}
              <div className="flex flex-col relative">
                <input
                  id="password"
                  type={show.password ? 'text' : 'password'}
                  placeholder={
                    formik.errors.password && formik.touched.password
                      ? formik.errors.password
                      : 'Пароль'
                  }
                  autoComplete="current-password"
                  className={`input py-3 px-6 text-xl text-yellow-300 border-none w-full rounded-full focus:ring-transparent bg-transparent ${
                    formik.errors.password && formik.touched.password
                      ? 'input-error placeholder-red'
                      : 'border-none'
                  }`}
                  {...formik.getFieldProps('password')}
                />
                {show.password ? (
                  <HiEyeOff
                    className="text-yellow-300 cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2"
                    size={20}
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  />
                ) : (
                  <HiEye
                    className="text-yellow-300 cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2"
                    size={20}
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  />
                )}
                {formik.errors.password && formik.touched.password && (
                  <span className="absolute text-rose-300 -bottom-8 left-4">
                    {formik.errors.password}
                  </span>
                )}
              </div>

              {/* Підтвердіть пароль */}
              <div className="flex flex-col relative">
                <input
                  id="cpassword"
                  type={show.cpassword ? 'text' : 'password'}
                  placeholder={
                    formik.errors.cpassword && formik.touched.cpassword
                      ? formik.errors.cpassword
                      : 'Підтвердіть пароль'
                  }
                  className={`input py-3 px-6 text-xl text-yellow-300 border-none w-full rounded-full focus:ring-transparent bg-transparent ${
                    formik.errors.cpassword && formik.touched.cpassword
                      ? 'input-error placeholder-red'
                      : 'border-none'
                  }`}
                  {...formik.getFieldProps('cpassword')}
                />
                {show.cpassword ? (
                  <HiEyeOff
                    className="text-yellow-300 cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2"
                    size={20}
                    onClick={() =>
                      setShow({ ...show, cpassword: !show.cpassword })
                    }
                  />
                ) : (
                  <HiEye
                    className="text-yellow-300 cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2"
                    size={20}
                    onClick={() =>
                      setShow({ ...show, cpassword: !show.cpassword })
                    }
                  />
                )}
                {formik.errors.cpassword && formik.touched.cpassword && (
                  <span className="absolute text-rose-300 -bottom-8 left-4">
                    {formik.errors.cpassword}
                  </span>
                )}
              </div>

              <div className="mt-4 mx-auto">
                <button
                  type="submit"
                  className="btn-gradient bg-[#3fb22a] rounded-full text-center text-white px-14 py-2 text-[22px] hover:text-black hover:scale-[.96] duration-300"
                >
                  Реєстрація
                </button>
              </div>
            </form>

            <Paragraph size="small" className="mt-4 text-center text-gray-400">
              Вже маєте обліковий запис?{' '}
              <Link href="/login" className="text-blue-700 hover:text-blue-400">
                Увійти
              </Link>
            </Paragraph>
          </div>
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
