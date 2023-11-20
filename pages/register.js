import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "../lib/validate";
import { useRouter } from "next/router";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50"
      onClick={onClose}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg">
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

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    setErrorMessage(null);
    console.log("Form values:", values);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    console.log("Options:", options);
    try {
      const res = await fetch("/api/auth/signup", options);
      console.log("HTTP Status:", res.status);

      const data = await res.json();

      console.log("Response data:", data);

      if (data.error) {
        console.error("Server error:", data.error);
        setErrorMessage(data.error);
      } else if (data.message) {
        console.error("Registration error:", data.message);
        setErrorMessage(data.message);
      } else if (data.status) {
        console.log("Registration successful:", data.user);
        setSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
  useEffect(() => {}, [isSuccessModalOpen, router]);

  const redirectToDashboard = () => {
    router.push("/");
  };

  return (
    <Layout>
      <Head>
        <title>Реєстрація</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">
            Реєстрація <br />
          </h1>

          <p className="w-3/4 mx-auto text-gray-400">
            Знайди свою половинку ❤️ &#128152; <br />
            Реєструйся отримай 2$ на карту. <br />
            Запроси друга отримай 1$
          </p>
        </div>

        {/* form */}
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div
            className={`${styles.input_group} ${
              formik.errors.username && formik.touched.username
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              autoComplete="username"
              type="text"
              name="username"
              placeholder="Користувач"
              className={styles.input_text}
              {...formik.getFieldProps("username")}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          {formik.errors.username && formik.touched.username ? (
            <span className="text-rose-500">{formik.errors.username}</span>
          ) : (
            <></>
          )}
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              autoComplete="email"
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <span className="text-rose-500">{formik.errors.email}</span>
          ) : (
            <></>
          )}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Пароль"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500">{formik.errors.password}</span>
          ) : (
            <></>
          )}

          <div
            className={`${styles.input_group} ${
              formik.errors.cpassword && formik.touched.cpassword
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Повторіть пароль"
              className={styles.input_text}
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-rose-500">{formik.errors.cpassword}</span>
          ) : (
            <></>
          )}

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Зареєструватись
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 ">
          Вже маєш аккаунт?{" "}
          <Link href={"/login"} className="text-blue-700">
            Увійти
          </Link>
        </p>
      </section>

      {/* Модальне вікно успішної реєстрації */}
      {isSuccessModalOpen && (
        <Modal onClose={() => redirectToDashboard()}>
          <p className="text-2xl pt-7 font-bold mb-4">
            Вітаємо! Ви успішно зареєструвалися!
          </p>
          <button
            onClick={() => redirectToDashboard()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            OK
          </button>
        </Modal>
      )}
    </Layout>
  );
}
