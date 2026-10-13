import React from 'react';

function SearchBar({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search books by title or author..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search books by title or author"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        aria-label="Filter books by category"
      >
        <option value="All">All Categories</option>
        <option value="Programming">Programming</option>
        <option value="Fiction">Fiction</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
        <option value="General">General</option>
      </select>
    </div>
  );
}

export default SearchBar;
