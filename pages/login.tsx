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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');

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

      console.log('Authentication status:', result);

      if (result && result.ok) {
        const successfulResult = result as SuccessfulSignInResponse; // Type assertion
        console.log('Redirecting to:', successfulResult.url);
        router.push('/user');
      } else {
        console.error('Authentication failed:', result?.error);
        if (
          result &&
          result.error === 'No user found with this email. Please sign up!'
        ) {
          formik.setFieldError('email', 'User with this email not found');
        } else {
          formik.setFieldError('password', 'Incorrect email or password');
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
        <div className="container flex notXl:flex-col xl:justify-around">
          <div className="max-w-[550px]">
            <Title tag="h2" className="mb-4 xl:mb-12 text-center">
              Увійти
            </Title>
            <Paragraph className="mx-auto text-gray-400 text-center mb-14">
              Зареєструйтеся зараз, щоб отримати бонус у розмірі $2 на вашу
              картку. Запросіть друга і отримайте додатковий $1! Завантажте
              додаток і отримайте готівку сьогодні! 💳💸
            </Paragraph>
          </div>

          <div>
            <form
              className="flex flex-col gap-4 w-full xl:w-[400px] mx-auto"
              onSubmit={formik.handleSubmit}
            >
              {errorMessage && (
                <div className="text-red-500 text-center my-4">
                  {errorMessage}
                </div>
              )}

              <div className="relative flex items-center gap-4">
                <HiAtSymbol
                  className="text-gray-500 absolute right-3"
                  size={25}
                />
                <input
                  type="email"
                  autoComplete="current-email"
                  placeholder="Електронна пошта"
                  className={`rounded-lg  bg-violet-400 text-gray-600 p-3 text-lg w-full focus:outline-none focus:ring-green-200   ${
                    formik.errors.email && formik.touched.email
                      ? 'border-rose-600'
                      : 'border-yellow-300'
                  }`}
                  {...formik.getFieldProps('email')}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <span className="text-rose-500 text-sm">
                  {formik.errors.email}
                </span>
              )}

              <div className="relative flex items-center gap-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Пароль"
                  autoComplete="current-password"
                  className={`rounded-lg text-gray-600 p-3 text-lg w-full focus:outline-none focus:ring focus:border-blue-300 ${
                    formik.errors.password && formik.touched.password
                      ? 'border-rose-600'
                      : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('password')}
                />
                {showPassword ? (
                  <HiEyeOff
                    className="text-gray-500 cursor-pointer absolute right-3"
                    size={25}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <HiEye
                    className="text-gray-500 cursor-pointer absolute right-3"
                    size={25}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>

              {formik.errors.password && formik.touched.password && (
                <span className="text-rose-500 text-sm">
                  {formik.errors.password}
                </span>
              )}

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-full py-3 px-6 w-full hover:bg-blue-600"
                >
                  Увійти
                </button>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleGoogleSignin}
                  className="bg-white text-gray-700 rounded-full py-3 px-6 flex items-center justify-center border border-gray-300 w-full hover:bg-gray-100"
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
            </form>

            <p className="text-center mt-4 text-gray-500">
              Ще не зареєстровані?{' '}
              <Link
                href="/register"
                className="text-blue-700 hover:text-blue-400"
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
