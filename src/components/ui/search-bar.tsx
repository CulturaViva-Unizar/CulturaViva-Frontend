import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  value: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onSearch,
  className = "",
}) => {
  const [searchText, setSearchText] = useState<string>(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    onSearch?.(searchText);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`${className} input-group`}>
      <input
        type="search"
        className="form-control border-0 rounded-pill"
        placeholder="Buscar"
        aria-label="Buscar"
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="btn border-0" type="button" onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
