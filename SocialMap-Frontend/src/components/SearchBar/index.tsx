import React from 'react'
import './index.css'

const SearchBar = ({ placeholder, handleSearch }: { placeholder: string, handleSearch?: any }) => {
    return (
        <div className='search'>
            <input
                type='search'
                placeholder={placeholder}
                disabled={false}
                onKeyUp={(e) => handleSearch(e)}
            />
        </div>

    )
}

export default SearchBar;