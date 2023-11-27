import { routes } from '@/utils/routes';
import { NextPage } from 'next';
import Head from 'next/head';

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section className="bg-slate-500">
        <div className="container">
          <h2 className="text-red">Сторінка, яку ви шукали - ще не створена</h2>
          <a href="/home">На головну</a>
        </div>
      </section>
    </>
  );
};

export default Custom404;
