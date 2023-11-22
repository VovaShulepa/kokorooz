import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { getSession, useSession, signOut } from "next-auth/react";
import connectMongo from "../database/conn";
import Users from "../model/Schema";
import Layout from "../layout/layout";

export default function Home({ userCount, users }) {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <div
      className={`bg-gradient-to-r from-violet-500 to-fuchsia-500 ${styles.container}`}
    >
      <Head>
        <title>Домашня Сторінка</title>
      </Head>

      {session ? User({ session, handleSignOut, userCount, users }) : Guest()}
    </div>
  );
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link legacyBehavior href={"/login"}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Sign In
          </a>
        </Link>
      </div>
    </main>
  );
}

// Authorize User
function User({ session, handleSignOut, userCount, users }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold text-indigo-600 mb-4">
        Вітаю, <span className="text-amber-400">{session.user.name}</span>!
      </h3>
      {/* DOWNLOAD_APP */}
      <p className=" mx-auto text-gray-800 font-bold mt-3 mb-3">
        Download our App
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
          ></Image>
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
      <div className="details mt-4">
        {/* <h5 className="text-2xl font-semibold">Login: {session.user.name}</h5> */}
        <h5 className="text-lg">Email: {session.user.email}</h5>
      </div>

      <p className="mt-6 text-gray-800 text-xl flex items-center justify-center">
        Загальна кількість користувачів{" "}
        <span className="font-bold text-2xl text-amber-400 ml-2 mr-2">
          Kokorooz
        </span>{" "}
        <Image
          alt="smile"
          className="mr-2"
          src={"/assets/smile.svg"}
          width={30}
          height={30}
        />
        :{" "}
        <span className="text-lime-300 text-2xl font-bold">
          &nbsp;{userCount}
        </span>
      </p>

      <div className="user-list mt-6">
        <h4 className="text-2xl font-semibold mb-4">Список користувачів:</h4>
        <div className="flex overflow-x-auto justify-center">
          <table className="table-auto bg-white rounded-md overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.email}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-semibold">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col mt-8 md:flex-row md:space-x-4 md:justify-center">
        <button
          onClick={handleSignOut}
          className="w-full md:w-auto px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300"
        >
          Вийти
        </button>

        <Link legacyBehavior href="/profile">
          <a className="w-full mt-4 md:w-auto md:mt-0 px-6 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300">
            Ваша сторінка
          </a>
        </Link>
      </div>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // Отримуємо загальну кількість користувачів
  const userCount = await getUsersCount();

  // Отримуємо інформацію про всіх користувачів
  const users = await getAllUsers();
  // Серіалізуємо дані у формат JSON
  const serializedUsers = JSON.parse(JSON.stringify(users));

  return {
    props: { session, userCount, users: serializedUsers },
  };
}
// Функція для отримання кількості користувачів
async function getUsersCount() {
  try {
    await connectMongo();
    const userCount = await Users.countDocuments();
    return userCount;
  } catch (error) {
    console.error("Помилка при отриманні кількості користувачів:", error);
    return 0;
  }
}

// Функція для отримання інформації про всіх користувачів
async function getAllUsers() {
  try {
    await connectMongo();
    const users = await Users.find({}, { username: 1, email: 1 });
    return users;
  } catch (error) {
    console.error("Помилка при отриманні інформації про користувачів:", error);
    return [];
  }
}
