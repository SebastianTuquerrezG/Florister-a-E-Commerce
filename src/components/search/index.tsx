import './style.css'
import { useState } from 'react';
import { FiSearch } from "react-icons/fi";

const Search = () =>{
    const [focused, setFocused] = useState(false);
    return (
        <div className={`searchBox ${focused ? 'focused' : ''}`}>
            <FiSearch size={18} className='search-icon' />
            <input
                type="text"
                placeholder="Busca tu bouquet ideal..."
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <button className='search-btn' type="button">
                Buscar
            </button>
        </div>
    );
};

export default Search