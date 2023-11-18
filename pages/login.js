import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { useRouter } from "next/router";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  // formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) router.push(status.url);
  }

  // Google Handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <Layout>
      <Head>
        <title>Вхід</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">
            <Image
              alt="smile"
              className="mr-2"
              src={"/assets/smile.svg"}
              width={30}
              height={30}
            />{" "}
            Kokorooz
          </h1>
          <h1 className="text-gray-600 text-2xl font-bold py-4">
            Знайди свою половинку ❤️ &#128152;
          </h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Реєструйся отримай 2$ на карту. <br />
            Запроси друга отримай 1$
          </p>
        </div>

        {/* form */}
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
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
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Пароль"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>

          {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500">{formik.errors.password}</span>
          ) : (
            <></>
          )}

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Увійти
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={styles.button_custom}
            >
              Увійти з Google{" "}
              <Image
                src={"/assets/google.svg"}
                alt="google"
                width="20"
                height={20}
              ></Image>
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 ">
          Ще не зареєстрований(на)?{" "}
          <Link legacyBehavior href={"/register"}>
            <a className="text-blue-700">Зареєструватись</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}
