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
        filterKey: "type"
      },
      {
        title: "Por Ocasión",
        items: ["Boda", "Cumpleaños", "Aniversario", "Simpatia", "Solo porque si"],
        filterKey: "occasion"
      },
      {
        title: "Por Color",
        items: ["Rojo", "Blanco", "Amarillo", "Rosa", "Morado"],
        filterKey: "color"
      },
    ],
  },
  Plantas: {
    sections: [
      {
        title: "Interior",
        items: ["Suculentas", "Cactus", "Helechos", "Potos", "Lirio de la Paz"],
        filterKey: "type"
      },
      {
        title: "Exterior",
        items: ["Arboles", "Arbustos", "Escaladores", "Setos", "Estacional"],
        filterKey: "type"
      },
      {
        title: "Por Nivel de Cuidado",
        items: ["Fácil", "Moderado", "Experto"],
        filterKey: "care"
      },
    ],
  },
  Servicios: {
    sections: [
      {
        // filterKey debe coincidir con lo que lee ServicesPage: "category"
        // items deben coincidir EXACTAMENTE con los valores de s.category en SERVICES
        title: "Por Categoría",
        items: ["Bodas", "Corporativo", "Celebración", "Simpatía", "Suscripción", "Regalo"],
        filterKey: "category"
      },
      {
        // filterKey "scale" → coincide con s.scale en SERVICES
        title: "Por Escala",
        items: ["Pequeño", "Mediano", "Grande", "Recurrente"],
        filterKey: "scale"
      },
    ],
  },
};

const dropdownLinks = Object.keys(menuData) as Array<keyof typeof menuData>;

const Navigation = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const getCatalogUrl = (category: string, filterKey: string, value: string) => {
    const normalizedValue = encodeURIComponent(value);
    if (category === 'Flores')    return `/catalogo?${filterKey}=${normalizedValue}`;
    if (category === 'Plantas')   return `/catalogo-plantas?${filterKey}=${normalizedValue}`;
    if (category === 'Servicios') return `/servicios?${filterKey}=${normalizedValue}`;
    return '/catalogo';
  };

  const handleMobileLinkClick = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <nav className='nav-wrapper py-2 relative'>
      <div className='container nav-desktop flex items-center justify-center'>
        <ul className='flex items-center gap-1 list-none m-0 p-0'>

          <li>
            <Link to="/">
              <Button className='link transition'>Home</Button>
            </Link>
          </li>

          {dropdownLinks.map((name) => (
            <li
              key={name}
              className='relative'
              onMouseEnter={() => handleMouseEnter(name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={
                name === 'Flores'   ? '/catalogo' :
                name === 'Plantas'  ? '/catalogo-plantas' :
                '/servicios'
              }>
                <Button className='link transition gap-1'>
                  {name}
                  <FaAngleDown
                    size={11}
                    className={`nav-arrow ${openMenu === name ? 'open' : ''}`}
                  />
                </Button>
              </Link>

              <div className={`mega-dropdown ${openMenu === name ? 'open' : ''}`}>
                {menuData[name].sections.map((section) => (
                  <div key={section.title} className='mega-dropdown__section'>
                    <p className='mega-dropdown__section-title'>{section.title}</p>
                    <ul className='mega-dropdown__list'>
                      {section.items.map((item) => (
                        <li key={item}>
                          <Link
                            to={getCatalogUrl(name, section.filterKey, item)}
                            className='mega-dropdown__item-link'
                            onClick={() => setOpenMenu(null)}
                          >
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

          <li>
            <Link to="/nuestra-historia">
              <Button className='link transition'>Nuestra Historia</Button>
            </Link>
          </li>
          <li>
            <Link to="/blog">
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
            <Link to="/" onClick={handleMobileLinkClick} className='nav-mobile-link'>
              Home
            </Link>
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
                  <Link
                    to={
                      name === 'Flores'   ? '/catalogo' :
                      name === 'Plantas'  ? '/catalogo-plantas' :
                      '/servicios'
                    }
                    className='nav-mobile-sublink nav-mobile-view-all'
                    onClick={handleMobileLinkClick}
                  >
                    Ver Todo {name}
                  </Link>

                  {menuData[name].sections.map((section) => (
                    <div key={section.title} className='nav-mobile-section'>
                      <p className='nav-mobile-section-title'>{section.title}</p>
                      {section.items.map((item) => (
                        <Link
                          key={item}
                          to={getCatalogUrl(name, section.filterKey, item)}
                          className='nav-mobile-sublink'
                          onClick={handleMobileLinkClick}
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
            <Link to="/nuestra-historia" onClick={handleMobileLinkClick} className='nav-mobile-link'>
              Nuestra Historia
            </Link>
          </li>
          <li className='nav-mobile-item'>
            <Link to="/blog" onClick={handleMobileLinkClick} className='nav-mobile-link'>
              Blog
            </Link>
          </li>

          <li className='nav-mobile-item nav-mobile-auth'>
            <Link to="/login" onClick={handleMobileLinkClick} className='nav-mobile-link'>
              Ingresar
            </Link>
            <Link to="/register" onClick={handleMobileLinkClick} className='nav-mobile-link'>
              Registrarse
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;