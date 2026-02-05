import './style.css'
import Button from '@mui/material/Button';
import { FiSearch } from "react-icons/fi";

const Search = () =>{
    return (
        <> 
        <div className="searchBox w-full h-8.5 bg-[#ddcf88] rounded-lg flex items-center relative p-2">
            <input className="w-full h-4.5 focus:outline-none bg-inherit p-2 text-[15px]" type="text" placeholder="Busca tu bouquet ideal"/>
            <Button className='w-1! min-w-7.5! h-7.5! rounded-full! text-black!'>
                <FiSearch size={24} className='text-black'></FiSearch>
            </Button>
        </div>
        </>
    )
}

export default Search