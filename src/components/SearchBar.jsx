function SearchBar({
  query,
  onChange,
  onClear,
}) {
  return (
    <div className="search-bar">

      <span className="search-icon">
        ⌕
      </span>

      <input
        type="text"
        value={query}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search people, empires, battles, places..."
      />

      {query && (
        <button
          className="search-clear"
          onClick={onClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}

    </div>
  );
}

export default SearchBar;