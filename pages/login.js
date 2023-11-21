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
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) {
      router.push(status.url);
    } else {
      if (status.error === "No user found with this email. Please sign up!") {
        formik.setFieldError("email", "No user found with this email");
      } else {
        // Displaying a generic error message for other errors
        formik.setFieldError("password", "Incorrect email or password");
      }
    }
  }

  // Google Handler function
  async function handleGoogleSignin() {
    console.log("Handle Google Signin called");
    const result = await signIn("google", {
      callbackUrl: "https://my-kokorooz.vercel.app",
    });
    console.log("Google Signin result:", result);
  }

  return (
    <Layout>
      <Head>
        <title>Вхід</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4 flex justify-center items-center">
            Log In{" "}
            <Image
              alt="corn"
              className="mr-2"
              src={"/assets/corn.svg"}
              width={30}
              height={30}
            />
          </h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Register now to receive a $2 bonus on your card.Invite a friend and
            get an extra $1! Download the app and cash in today! 💳💸
          </p>
          {/* DOWNLOAD_APP */}
          <p className=" mx-auto text-gray-800 font-bold mt-3 mb-3">
            Download App
          </p>
          <div className="flex justify-center space-x-4 z-50">
            <a
              href="https://apps.apple.com/gb/app/tinder-dating-chat-friends/id547702041"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/app_store.svg"
                alt="App Store"
                width={120}
                height={40}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.tinder&hl=en_US&gl=US"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/google_play.svg"
                alt="Google Play"
                width={120}
                height={40}
              />
            </a>
          </div>
          {/* DOWNLOAD_APP */}
        </div>

        {/* form */}
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          {errorMessage && (
            <div className="text-red-500 text-center my-4">{errorMessage}</div>
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
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
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
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={styles.button_custom}
            >
              Sign in with Google{" "}
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
          Not registered yet?{" "}
          <Link legacyBehavior href={"/register"}>
            <a className="text-blue-700 hover:text-blue-400">Register</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}
