import './styles.css';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";

const menuData = {
  Flowers: {
    sections: [
      {
        title: "By Type",
        items: ["Roses", "Tulips", "Orchids", "Sunflowers", "Lilies"],
      },
      {
        title: "By Occasion",
        items: ["Wedding", "Birthday", "Anniversary", "Sympathy", "Just Because"],
      },
      {
        title: "By Color",
        items: ["Red", "White", "Yellow", "Pink", "Purple"],
      },
    ],
  },
  Plants: {
    sections: [
      {
        title: "Indoor",
        items: ["Succulents", "Cactus", "Ferns", "Pothos", "Peace Lily"],
      },
      {
        title: "Outdoor",
        items: ["Trees", "Shrubs", "Climbers", "Hedges", "Seasonal"],
      },
      {
        title: "By Care Level",
        items: ["Easy", "Moderate", "Expert", "Pet Friendly", "Low Light"],
      },
    ],
  },
  Services: {
    sections: [
      {
        title: "Events",
        items: ["Wedding Planning", "Corporate Events", "Quinceañeras", "Baby Showers"],
      },
      {
        title: "Delivery",
        items: ["Same Day", "Scheduled", "Subscription", "Gift Wrapping"],
      },
      {
        title: "Custom",
        items: ["Custom Arrangements", "Workshop Classes", "Consultations"],
      },
    ],
  },
};

const dropdownLinks = Object.keys(menuData) as Array<keyof typeof menuData>;
const simpleLinks = ["Home", "Our Story", "Blog"];

const Navigation = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  let closeTimeout: ReturnType<typeof setTimeout>;

  const handleMouseEnter = (name: string) => {
    clearTimeout(closeTimeout);
    setOpenMenu(name);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <nav className='py-2 relative'>
      <div className='container flex items-center justify-center'>
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
              <Button className='link transition'>Our Story</Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button className='link transition'>Blog</Button>
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navigation;