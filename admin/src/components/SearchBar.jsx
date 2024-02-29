import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    return (
        <div className='flex w-full justify-center items-center mt-6'>
            <div className='relative flex w-[70%]'>
                <input
                    type='search'
                    placeholder='Search...'
                    className='rounded-md border border-silver/40 w-full px-3 py-2 pl-8 bg-white border-none outline-none focus:outline-slate-200 focus:outline-1 shadow-sm font-poppins-300 text-sm'></input>
                <CiSearch  className="absolute left-2 top-[27%]"/>
            </div>
        </div>
    );
};

export default SearchBar;
