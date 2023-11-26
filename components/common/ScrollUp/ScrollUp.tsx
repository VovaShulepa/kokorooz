import IconUp from 'public/up-icon.svg';
import { useEffect, useState } from 'react';

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`${
        isVisible ? 'fixed bottom-6 right-4 z-40' : 'hidden'
      } p-2 cursor-pointer transition-opacity`}
      onClick={scrollToTop}
    >
      <IconUp className="scroll-up w-11 h-11 duration-300 fill-[#49048ad0] hover:scale-110" />
    </button>
  );
};

export default ScrollUp;
