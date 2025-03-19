import React, { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className={`input-group ${className}`}
      style={{
        borderRadius: '9999px',
        padding: 0,
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <input
        type="search"
        className="form-control border-0"
        placeholder="Buscar"
        aria-label="Buscar"
        style={{
          borderRadius: '9999px 0 0 9999px',
          backgroundColor: 'transparent'
        }}
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="btn border-0"
        type="button"
        style={{
          borderRadius: '0 9999px 9999px 0'
        }}
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
