import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "../lib/validate";
import { useRouter } from "next/router";
import { connectMongo } from "../database/conn";
import Users from "../model/Schema";

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
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

  // Функція для перевірки існування імейла в базі даних
  async function isEmailTaken(email) {
    try {
      await connectMongo(); // Підключення до бази даних
      const existingUser = await Users.findOne({ email });
      return !!existingUser; // Повертає true, якщо імейл вже існує
    } catch (error) {
      console.error("Помилка при перевірці існування імейла:", error);
      return false;
    }
  }

  async function onSubmit(values) {
    // Перевірка існування імейла у базі даних
    let emailTaken;
    try {
      emailTaken = await isEmailTaken(values.email);

      if (emailTaken) {
        formik.setFieldError("email", "Цей імейл вже зареєстровано");
      } else {
        // Якщо імейл не зайнятий, продовжити реєстрацію
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formik.values.username,
            email: formik.values.email,
            password: formik.values.password,
          }),
        };

        await fetch("http://localhost:3000/api/auth/signup", options)
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              router.push("http://localhost:3000");
            }
          })
          .catch((error) => {
            console.error("Помилка при реєстрації:", error.message);
          });
      }
    } catch (error) {
      console.error("Помилка при перевірці існування імейла:", error);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Реєстрація</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10 ">
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
          <div
            className={`${styles.input_group} ${
              formik.errors.username && formik.touched.username
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="text"
              name="Username"
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

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          Вже маєш аккаунт?{" "}
          <Link legacyBehavior href={"/login"}>
            <a className="text-blue-700">Увійти</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}
