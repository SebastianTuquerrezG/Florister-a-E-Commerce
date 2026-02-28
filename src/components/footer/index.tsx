import { Link } from 'react-router-dom';
import logoVerde from '../../assets/logosolo.png';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import './styles.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-main container'>

                {/* ── COL 1: Logo + Info ── */}
                <div className='footer-brand'>
                    <Link to='/'>
                        <img src={logoVerde} alt="Floridos logo" className='footer-logo' />
                    </Link>
                    <div className='footer-info'>
                        <p>Calle 1N #40B-18</p>
                        <p>Popayán, Cauca, Colombia</p>
                    </div>
                    <div className='footer-contact'>
                        <p>+57 3146890813</p>
                        <a href="mailto:floristeriafloridos@floridos.com" className='footer-email'>floristeriafloridos@floridos.com</a>
                    </div>
                </div>

                {/* ── COL 2: Links ── */}
                <div className='footer-links'>
                    <Link to='/account'      className='footer-link'>Mi cuenta</Link>
                    <Link to='/faq'          className='footer-link'>FAQ</Link>
                    <Link to='/order-tracking' className='footer-link'>Rastrear pedido</Link>
                    <Link to='/stores'       className='footer-link'>Nuestras tiendas</Link>
                    <Link to='/contact'      className='footer-link'>Contáctanos</Link>
                </div>

                {/* ── COL 3: Social ── */}
                <div className='footer-social-col'>
                    <p className='footer-social-label'>Síguenos</p>
                    <div className='footer-social-icons'>
                        <a href="https://wa.me/573146890813" target="_blank" rel="noreferrer" className='footer-social-btn' aria-label="WhatsApp">
                            <FaWhatsapp size={16} />
                        </a>
                        <a href="https://www.instagram.com/floristeriafloridos" target="_blank" rel="noreferrer" className='footer-social-btn' aria-label="Instagram">
                            <FaInstagram size={16} />
                        </a>
                        <a href="https://www.facebook.com/floristeriafloridos" target="_blank" rel="noreferrer" className='footer-social-btn' aria-label="Facebook">
                            <FaFacebookF size={16} />
                        </a>
                        <a href="https://www.tiktok.com/@floristeriafloridos" target="_blank" rel="noreferrer" className='footer-social-btn' aria-label="TikTok">
                            <FaTiktok size={16} />
                        </a>
                    </div>
                </div>

            </div>

            {/* ── BOTTOM BAR ── */}
            <div className='footer-bottom'>
                <div className='container footer-bottom-inner'>
                    <p className='footer-copy'>© 2026 Floridos. Todos los derechos reservados.</p>
                    <div className='footer-bottom-links'>
                        <Link to='/privacy' className='footer-bottom-link'>Política de privacidad</Link>
                        <Link to='/cookies' className='footer-bottom-link'>Política de cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;