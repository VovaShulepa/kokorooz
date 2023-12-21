import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import connectMongo from '../database/conn';
import Users from '../model/Schema';
import { Section } from '@/components/common/Section';
import { Title } from '@/components/typography/Title';
import { Paragraph } from '@/components/typography/Paragraph';
import Link from 'next/link';
import Image from 'next/image';

interface UserProps {
  session: Session;
  userCount: number;
  users: {
    _id: string | null | undefined;
    username: string;
    email: string;
  }[];
}

export const getServerSideProps: GetServerSideProps<UserProps> = async ({
  req,
}) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    await connectMongo();
    const userCount = await Users.countDocuments();
    const users = await Users.find({}, { username: 1, email: 1 });

    const serializedUsers = JSON.parse(JSON.stringify(users));

    return {
      props: { session, userCount, users: serializedUsers },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};

export default function User({ session, userCount, users }: UserProps) {
  const handleSignOut = () => {
    signOut();
  };
  const [statuses, setStatuses] = useState<string[]>([]);

  useEffect(() => {
    const newStatuses = users.map(() =>
      Math.random() < 0.5 ? 'Online' : 'Offline',
    );
    setStatuses(newStatuses);
  }, [users]);

  return (
    <>
      <Head>
        <title>{session?.user?.name || 'User'}</title>
      </Head>

      <Section className="container pt-32">
        {session ? (
          <>
            <Title tag="h1" className="text-center">
              Вітаю,{' '}
              <span className="text-amber-400">
                {session.user?.name || 'User'}
              </span>
              !
            </Title>
            <Paragraph className="mt-6 text-gray-800 text-xl flex items-center justify-center">
              Загальна кількість партнерів{' '}
              <span className="font-bold text-2xl text-amber-400 ml-2 mr-2">
                Kokorooz
              </span>{' '}
              :{' '}
              <span className="text-lime-300 text-2xl font-bold">
                &nbsp;{userCount}
              </span>
            </Paragraph>
            <Title tag="h2" className="text-center mt-10 mb-5">
              Наші користувачі:
            </Title>
            <div className="xl:w-[800px]  overflow-x-auto mx-auto">
              <table className="table-auto rounded-md overflow-hidden w-full">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-sm ">
                    <th className="px-4 py-2 sm:px-6 sm:py-3 md:py-3 lg:py-3 xl:py-3 notXl:hidden">
                      №
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 md:py-3 lg:py-3 xl:py-3">
                      Name
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 md:py-3 lg:py-3 xl:py-3">
                      Email
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 md:py-3 lg:py-3 xl:py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={
                        index % 2 === 0
                          ? 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                          : 'bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700'
                      }
                    >
                      <td className="px-4 py-2 text-yellow-300 sm:px-6 sm:py-3 md:py-3 lg:py-3 xl:py-3 notXl:hidden">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3 md:py-3 lg:py-3 xl:py-3">
                        <div className="flex items-center">
                          <Image
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                            width={96}
                            height={96}
                            src={`/users/${
                              index % 5 === 0
                                ? 'boy'
                                : index % 5 === 1
                                ? 'boy1'
                                : index % 5 === 2
                                ? 'boy2'
                                : index % 5 === 3
                                ? 'girl'
                                : 'girl1'
                            }.png`}
                            alt="User image"
                          />
                          <div className="ps-2 sm:ps-3">
                            <div className="text-sm sm:text-base font-semibold">
                              {user.username}
                            </div>
                            <div className="font-normal text-gray-500 text-xs sm:text-sm notXl:hidden">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3 md:py-3 lg:py-3 xl:py-3">
                        <div className="flex items-center text-xs sm:text-sm">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-3 md:py-3 lg:py-3 xl:py-3">
                        <div className="flex items-center text-xs sm:text-sm">
                          {statuses[index] === 'Online' ? (
                            <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-500 me-1.5 sm:me-2"></div>
                          ) : (
                            <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-500 me-1.5 sm:me-2"></div>
                          )}
                          {statuses[index]}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col mt-8 justify-center">
              <button
                onClick={handleSignOut}
                className="w-full px-6 py-2 rounded-full mx-auto max-w-[200px] bg-orange-500 text-white hover:bg-red "
              >
                Вийти
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">
            Ще не зареєстровані?{' '}
            <Link
              href="/register"
              className="text-blue-700 hover:text-blue-400"
            >
              Реєстрація
            </Link>
          </p>
        )}
      </Section>
    </>
  );
}
