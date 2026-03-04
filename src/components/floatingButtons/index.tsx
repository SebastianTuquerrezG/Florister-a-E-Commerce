import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { TbArrowUp } from 'react-icons/tb';
import './styles.css';

const WHATSAPP_NUMBER = '573146890813';
const WHATSAPP_MSG    = encodeURIComponent('¡Hola! Me gustaría hacer un pedido 🌸');

const FloatingButtons = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className='floating-btns'>

      {/* WhatsApp — grande */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target='_blank'
        rel='noreferrer'
        className='floating-btn floating-btn--wa'
        aria-label='Escribir por WhatsApp'
      >
        <FaWhatsapp size={26} />
        <span className='floating-btn--wa__label'>Escríbenos</span>
      </a>

      {/* Back to top — pequeño, solo visible si scrolleó */}
      <button
        className={`floating-btn floating-btn--top ${visible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label='Volver al inicio'
      >
        <TbArrowUp size={20} />
      </button>

    </div>
  );
};

export default FloatingButtons;