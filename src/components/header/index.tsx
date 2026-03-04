import { Link } from 'react-router-dom'
import logoVerde from '../../assets/letra_verde.png'
import Search from '../search'
import Badge from '@mui/material/Badge';
import type { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { BsBasket2Fill } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import Navigation from './navigation';
import useScrollDirection from '../../hooks/useScrollDirection';
import './styles.css';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
    const { scrollDir, scrolled } = useScrollDirection(8);
    const hidden = scrollDir === 'down' && scrolled;

    return (
        <header className={`site-header ${hidden ? 'site-header--hidden' : ''} ${scrolled ? 'site-header--scrolled' : ''}`}>
            {/* ── TOP STRIP ── */}
            <div className='top-strip py-2 bg-primary border-b border-gray-250'>
                <div className='container'>
                    <div className='flex items-center justify-between'>
                        <p className='header-welcome text-white font-medium'>
                            Welcome to Floristeria Floridos
                        </p>
                        <ul className='header-top-links flex items-center gap-6'>
                            <li className='list-none'>
                                <Link to='/help-center' className='text-white link font-medium'>Ayuda</Link>
                            </li>
                            <li className='list-none'>
                                <Link to='/order-tracking' className='text-white link font-medium'>Order Tracking</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── MAIN HEADER ── */}
            <div className='header py-4 border-b border-gray-250'>
                <div className='container flex items-center justify-between gap-4'>

                    {/* Logo */}
                    <div className='header-logo shrink-0'>
                        <Link to='/'>
                            <img className='w-25' src={logoVerde} alt="logo verde" />
                        </Link>
                    </div>

                    {/* Search — oculto en móvil, visible en md+ */}
                    <div className='header-search flex-1 max-w-md hidden md:block'>
                        <Search />
                    </div>

                    {/* Acciones */}
                    <div className='header-actions flex items-center gap-2 shrink-0'>
                        <div className='header-auth hidden sm:flex items-center gap-1 text-sm font-medium'>
                            <Link to="/login" className='link transition'>Login</Link>
                            <span className='text-gray-400'>/</span>
                            <Link to="/register" className='link transition'>Register</Link>
                        </div>

                        <Tooltip title="Wishlist">
                            <IconButton aria-label="wishlist" size="small">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <MdOutlineFavoriteBorder />
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Cart">
                            <IconButton aria-label="cart" size="small">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <BsBasket2Fill />
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                {/* Search en móvil — debajo del header */}
                <div className='container mt-3 block md:hidden'>
                    <Search />
                </div>
            </div>

            {/* ── NAVIGATION ── */}
            <Navigation />
        </header>
    );
};

export default Header;