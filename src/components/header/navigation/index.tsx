import './styles.css';
import { useState, useRef } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const menuData = {
  Flores: {
    sections: [
      {
        title: "Por Tipo",
        items: ["Rosas", "Tulipanes", "Orquideas", "Girasoles", "Lirios"],
      },
      {
        title: "Por Ocasión",
        items: ["Boda", "Cumpleaños", "Aniversario", "Simpatia", "Solo porque si"],
      },
      {
        title: "Por Color",
        items: ["Rojo", "Blanco", "Amarillo", "Rosa", "Morado"],
      },
    ],
  },
  Plantas: {
    sections: [
      {
        title: "Interior",
        items: ["Suculentas", "Cactus", "Helechos", "Potos", "Lirio de la Paz"],
      },
      {
        title: "Exterior",
        items: ["Arboles", "Arbustos", "Escaladores", "Setos", "Estacional"],
      },
      {
        title: "Por Nivel de Cuidado",
        items: ["Fácil", "Moderado", "Experto", "Amigable con Mascotas", "Poca Luz"],
      },
    ],
  },
  Servicios: {
    sections: [
      {
        title: "Eventos",
        items: ["Planificación de Bodas", "Eventos Corporativos", "Quinceañeras", "Duchas de Bebé"],
      },
      {
        title: "Entrega",
        items: ["Mismo Día", "Programado", "Suscripción", "Envoltura de Regalos"],
      },
      {
        title: "Personalizados",
        items: ["Arreglos Personalizados", "Clases de Taller", "Consultas de Diseño", "Tarjetas Personalizadas"],
      },
    ],
  },
};

const dropdownLinks = Object.keys(menuData) as Array<keyof typeof menuData>;

const Navigation = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (name: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenMenu(name);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const toggleMobile = (name: string) =>
    setMobileExpanded(prev => (prev === name ? null : name));

  return (
    <nav className='nav-wrapper py-2 relative'>
      <div className='container nav-desktop flex items-center justify-center'>
        <ul className='flex items-center gap-1 list-none m-0 p-0'>

          {/* Home simple link */}
          <li>
            <Link to="/">
              <Button className='link transition'>Home</Button>
            </Link>
          </li>

          {/* Dropdown links */}
          {dropdownLinks.map((name) => (
            <li
              key={name}
              className='relative'
              onMouseEnter={() => handleMouseEnter(name)}
              onMouseLeave={handleMouseLeave}
            >
              <Button className='link transition gap-1'>
                {name}
                <FaAngleDown
                  size={11}
                  className={`nav-arrow ${openMenu === name ? 'open' : ''}`}
                />
              </Button>

              {/* Mega Dropdown */}
              <div className={`mega-dropdown ${openMenu === name ? 'open' : ''}`}>
                {menuData[name].sections.map((section) => (
                  <div key={section.title} className='mega-dropdown__section'>
                    <p className='mega-dropdown__section-title'>{section.title}</p>
                    <ul className='mega-dropdown__list'>
                      {section.items.map((item) => (
                        <li key={item}>
                          <Link to="/" className='mega-dropdown__item-link'>
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          ))}

          {/* Our Story & Blog simple links */}
          <li>
            <Link to="/">
              <Button className='link transition'>Nuestra Historia</Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button className='link transition'>Blog</Button>
            </Link>
          </li>

        </ul>
      </div>

      <div className='nav-mobile-bar container flex items-center justify-between'>
        <span className='nav-mobile-label'>Menú</span>
        <button className='nav-hamburger' onClick={() => setMobileOpen(p => !p)}>
          {mobileOpen ? <RiCloseLine size={22} /> : <RiMenu3Line size={22} />}
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <div className={`nav-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <ul className='nav-mobile-list'>

          <li className='nav-mobile-item'>
            <Link to="/" onClick={() => setMobileOpen(false)} className='nav-mobile-link'>Home</Link>
          </li>

          {dropdownLinks.map((name) => (
            <li key={name} className='nav-mobile-item'>
              <button
                className='nav-mobile-link nav-mobile-toggle'
                onClick={() => toggleMobile(name)}
              >
                {name}
                <FaAngleDown size={11} className={`nav-arrow ${mobileExpanded === name ? 'open' : ''}`} />
              </button>

              {mobileExpanded === name && (
                <div className='nav-mobile-submenu'>
                  {menuData[name].sections.map((section) => (
                    <div key={section.title} className='nav-mobile-section'>
                      <p className='nav-mobile-section-title'>{section.title}</p>
                      {section.items.map((item) => (
                        <Link
                          key={item}
                          to="/"
                          className='nav-mobile-sublink'
                          onClick={() => setMobileOpen(false)}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}

          <li className='nav-mobile-item'>
            <Link to="/" onClick={() => setMobileOpen(false)} className='nav-mobile-link'>Nuestra Historia</Link>
          </li>
          <li className='nav-mobile-item'>
            <Link to="/" onClick={() => setMobileOpen(false)} className='nav-mobile-link'>Blog</Link>
          </li>

          {/* Login/Register solo en móvil */}
          <li className='nav-mobile-item nav-mobile-auth'>
            <Link to="/login"    className='nav-mobile-link'>Ingresar</Link>
            <Link to="/register" className='nav-mobile-link'>Registrarse</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;