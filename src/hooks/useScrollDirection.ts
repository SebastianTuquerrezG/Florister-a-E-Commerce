import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down';

const useScrollDirection = (threshold = 10) => {
  const [scrollDir,    setScrollDir]    = useState<ScrollDirection>('up');
  const [scrolled,     setScrolled]     = useState(false); // true si bajó > 80px
  const [lastScrollY,  setLastScrollY]  = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 80);

      if (Math.abs(currentY - lastScrollY) < threshold) return;

      setScrollDir(currentY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, threshold]);

  return { scrollDir, scrolled };
};

export default useScrollDirection;