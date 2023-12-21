import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { HiAtSymbol, HiEye, HiEyeOff } from 'react-icons/hi';
import { useState } from 'react';
import { signIn, SignInResponse } from 'next-auth/react';

import { useFormik } from 'formik';
import loginValidate from '../lib/validate';
import { useRouter } from 'next/router';
import { Section } from '@/components/common/Section';
import { Title } from '@/components/typography/Title';
import { Paragraph } from '@/components/typography/Paragraph';
import data from '@/data/registerData.json';

interface FormValues {
  email: string;
  password: string;
}

interface SuccessfulSignInResponse extends SignInResponse {
  ok: true;
  url: string;
  user: {
    name: string;
    email: string;
  };
}

export default function Login() {
  const router = useRouter();
  const [, setErrorMessage] = useState<string>('');

  const [show, setShow] = useState({ password: false });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    } as FormValues,
    validate: loginValidate,
    onSubmit,
  });

  async function onSubmit(values: FormValues) {
    console.log('Form values:', values);
    setErrorMessage('');

    try {
      const result: SignInResponse | undefined = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: '/',
      });

      console.log('Статус автентифікації:', result);

      if (result && result.ok) {
        const successfulResult = result as SuccessfulSignInResponse; // Type assertion
        console.log('Redirecting to:', successfulResult.url);
        router.push('/user');
      } else {
        console.error('Помилка автентифікації:', result?.error);
        if (
          result &&
          result.error ===
            'Користувача з цим Email не знайдено. Будь ласка, зареєструйтеся!'
        ) {
          formik.setFieldError('email', 'Користувача з цим Email не знайдено!');
        } else {
          formik.setFieldError('password', 'Неправильний Пароль');
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setErrorMessage('Error during authentication. Please try again.');
    }
  }

  async function handleGoogleSignin() {
    console.log('Calling Google Signin handler');
    try {
      const result: SignInResponse | undefined = await signIn('google', {
        callbackUrl: '/user',
      });

      if (result && result.ok) {
        const successfulResult = result as SuccessfulSignInResponse; // Type assertion
        const userData = {
          username: successfulResult.user?.name,
          email: successfulResult.user?.email,
        };

        // Send user data to the server
        const response = await fetch('/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log('User data sent to the server successfully');
        } else {
          console.error('Failed to send user data to the server');
        }
      }

      console.log('Google Signin result:', result);
    } catch (error) {
      console.error('Google Signin error:', error);
    }
  }

  return (
    <>
      <Head>
        <title>Вхід</title>
      </Head>

      <Section className="pt-40">
        <div className="container flex notXl:flex-col xl:justify-around items-center">
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

          <div className="notXl:mt-16 ">
            <form
              className="flex flex-col gap-12 w-full xl:w-[400px] mx-auto"
              onSubmit={formik.handleSubmit}
            >
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
                  className="text-violet-700 absolute right-6 top-1/2 transform -translate-y-1/2"
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
                  autoComplete="new-password"
                  className={`input py-3 px-6 text-xl text-yellow-300 border-none w-full rounded-full focus:ring-transparent bg-transparent ${
                    formik.errors.password && formik.touched.password
                      ? 'input-error placeholder-red'
                      : 'border-none'
                  }`}
                  {...formik.getFieldProps('password')}
                />
                {show.password ? (
                  <HiEyeOff
                    className="text-violet-700 cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2"
                    size={20}
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  />
                ) : (
                  <HiEye
                    className="text-violet-700 cursor-pointer absolute right-6 top-1/2 transform -translate-y-1/2"
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

              {/* Buttons */}
              <div className="flex flex-col justify-center gap-4">
                <div className="">
                  <button
                    type="submit"
                    className="btn-gradient bg-[#3fb22a] text-lg w-full px-4 py-2 rounded-full text-white hover:text-black hover:scale-[.96] duration-300"
                  >
                    Увійти
                  </button>
                </div>
                <div className="">
                  <button
                    type="button"
                    onClick={handleGoogleSignin}
                    className="bg-gray-300 text-black text-lg rounded-full py-2 px-4 flex items-center justify-center w-full hover:bg-gray-100 hover:scale-[.96] duration-300"
                  >
                    Увійти за допомогою Google{' '}
                    <Image
                      src="/google.svg"
                      className="ml-2"
                      alt="google"
                      width="20"
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </form>

            <p className="text-center mt-4 text-gray-500">
              Ще не зареєстровані?{' '}
              <Link
                href="/register"
                className="text-violet-700 hover:text-violet-500"
              >
                Реєстрація
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
