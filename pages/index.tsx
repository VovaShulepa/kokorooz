import { NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';

import { Hero } from '@/page-components/Hero/Hero';
import { Map } from '@/page-components/Map/Map';
import { Action } from '@/page-components/Action/Action';
import { FeedBack } from '@/page-components/Feedback/Feedback';

import 'aos/dist/aos.css';
import AOS from 'aos';
import ScrollUp from '@/components/common/ScrollUp/ScrollUp';
import { Faq } from '@/page-components/Faq/Faq';

const Home: NextPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title>Kokorooz</title>
      </Head>
      <Hero />
      <Action />
      <Map />
      <FeedBack />
      <Faq />
      <ScrollUp />
    </>
  );
};

export default Home;
