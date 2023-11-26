import type { AppProps } from 'next/app';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import '@/styles/globals.css';
import 'aos/dist/aos.css';

const App = ({ Component, pageProps = {} }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
