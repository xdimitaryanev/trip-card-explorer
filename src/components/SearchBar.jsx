import { Search, X } from "lucide-react";
import { memo } from 'react';

const SearchBar = memo(({ searchTerm, onSearchChange, sortByRating, onSortToggle }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && searchTerm) {
      handleClear();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar__input-container">
        <span className="search-bar__icon search-bar__icon--left" aria-hidden="true">
          <Search size={22} />
        </span>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search trips by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search trips by name"
          autoComplete="off"
        />
        {searchTerm && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={handleClear}
            aria-label="Clear search"
            tabIndex={0}
          >
            <X size={18} />
          </button>
        )}
      </div>
      <div className="search-bar__sort">
        <input
          type="checkbox"
          id="sort-rating"
          checked={sortByRating}
          onChange={(e) => onSortToggle(e.target.checked)}
          className="search-bar__checkbox"
          aria-label="Sort trips by rating from high to low"
        />
        <label htmlFor="sort-rating" className="search-bar__sort-label">
          Sort by Rating (High to Low)
        </label>
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;