import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import connectMongo from '../database/conn';
import Users from '../model/Schema';
import { Section } from '@/components/common/Section';
import { Title } from '@/components/typography/Title';
import { Paragraph } from '@/components/typography/Paragraph';
import Link from 'next/link';

interface UserProps {
  session: Session;
  userCount: number;
  users: { username: string; email: string }[];
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

  return (
    <>
      <Head>
        <title>{session?.user?.name || 'User'}</title>
      </Head>

      <Section className="container pt-24">
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
              Загальна кількість користувачів{' '}
              <span className="font-bold text-2xl text-amber-400 ml-2 mr-2">
                Kokorooz
              </span>{' '}
              :{' '}
              <span className="text-lime-300 text-2xl font-bold">
                &nbsp;{userCount}
              </span>
            </Paragraph>

            <div className="user-list mt-6">
              <Title
                tag="h3"
                className="text-2xl font-semibold mb-4 text-center"
              >
                Список користувачів:
              </Title>
              <div className="flex overflow-x-auto justify-center">
                <table className="table-auto rounded-md overflow-hidden">
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
                        className={
                          index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-900'
                        }
                      >
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2 font-semibold">
                          {user.username}
                        </td>
                        <td className="px-4 py-2">{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
