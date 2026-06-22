import React, { useState } from 'react';
import './SearchBar.css';

const SL_SUGGESTIONS = [
  'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo',
  'Anuradhapura', 'Trincomalee', 'Batticaloa', 'Matara', 'Nuwara Eliya',
  'Kurunegala', 'Ratnapura', 'Badulla', 'Polonnaruwa', 'Hambantota',
];

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 0) {
      setSuggestions(
        SL_SUGGESTIONS.filter(c => c.toLowerCase().startsWith(val.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  }

  function handleSelect(city) {
    setQuery(city);
    setSuggestions([]);
    onSearch(`${city},LK`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      setSuggestions([]);
      onSearch(`${query.trim()},LK`);
    }
  }

  return (
    <div className="searchbar-wrapper">
      <form className="searchbar" onSubmit={handleSubmit} role="search">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search Sri Lanka city..."
          aria-label="Search city"
          autoComplete="off"
        />
        <button type="submit" aria-label="Search">🔍</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions" role="listbox">
          {suggestions.map(city => (
            <li
              key={city}
              role="option"
              aria-selected="false"
              onClick={() => handleSelect(city)}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
