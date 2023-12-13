import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import '@/styles/globals.css';
import 'aos/dist/aos.css';

import { Header } from '@/page-components/Header/Header';
import { Footer } from '@/page-components/Footer/Footer';

const App = ({ Component, pageProps = {} }: AppProps) => {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
};

export default App;
