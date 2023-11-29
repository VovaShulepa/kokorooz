import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 - Сторінка не знайдена</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section className="flex-grow pt-40 pb-40 container">
        <h1 className="text-red text-center font-bold text-9xl">404</h1>
        <div className="text-center">
          <h2 className="text-red text-4xl mb-12">
            Сторінка, яку ви шукали, ще не існує
          </h2>
          <div className="hover:scale-95">
            <Link
              href="/"
              className="text-4xl bg-[#431462] rounded-full px-6 py-4  hover:text-[#24575c]"
            >
              На головну
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Custom404;
