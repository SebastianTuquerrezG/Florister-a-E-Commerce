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

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));


const Header = () => {
    return (
        <>
            <header>
                <div className='top-strip py-2 border-t border-gray-300 bg-primary border-b'>
                    <div className='container'>
                        <div className='flex items-center justify-between'>
                            <div className='col1 w-[50%]'>
                                <p className='text-[20px] font-medium text-white'>Welcome to Floristeria Floridos</p>
                            </div>

                            <div className='col2 flex items-center justify-end'>
                                <ul className='flex items-center gap-6'>
                                    <li className='list-none'>
                                        <Link to='/help-center' className='text-white link text-[20px] font-medium'>Ayuda</Link>
                                    </li>
                                    <li className='list-none'>
                                        <Link to='/order-tracking' className='text-white link text-[20px] font-medium'>Order Tracking</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='header'>
                    <div className='container flex items-center justify-between py-4'>
                        <div className='col1 w-[14%]'>
                            <Link to='/'><img src={logoVerde} alt="logo verde" /></Link>
                        </div>

                        <div className='col2 w-[40%]'>
                            <Search></Search>
                        </div>

                        <div className='col3 w-[30%] flex items-center pl-7'>
                            <ul className='flex items-center justify-end gap-3'>
                                <li className='list-none'>
                                    <Link to="/login" className='link transition font-medium'>Login</Link> 
                                    / 
                                    <Link to="/register" className='link transition font-medium'>Register</Link>
                                </li>

                                <li className='list-none'>
                                    <Tooltip title="Wishlist">
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={4} color="secondary">
                                            <MdOutlineFavoriteBorder  />
                                        </StyledBadge>
                                    </IconButton>
                                    </Tooltip>
                                </li>   

                                <li className='list-none'>
                                    <Tooltip title="Cart">
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={4} color="secondary">
                                            <BsBasket2Fill />
                                        </StyledBadge>
                                    </IconButton>
                                    </Tooltip>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header