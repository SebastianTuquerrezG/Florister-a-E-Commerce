import './style.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";

    const Search = () =>{
    const [query,   setQuery]   = useState('');
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();

    const handleSearch = () => {
        const q = query.trim();
        if (q) navigate(`/buscar?q=${encodeURIComponent(q)}`);
    };

    return (
        <div className={`searchBox ${focused ? 'focused' : ''}`}>
        <FiSearch size={18} className="search-icon" />
        <input
            type="text"
            placeholder="Busca tu bouquet ideal..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
        <button className="search-btn" type="button" onClick={handleSearch}>
            Buscar
        </button>
        </div>
    );
};

export default Search