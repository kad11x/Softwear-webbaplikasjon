// Bruker.js
import React, { useState } from 'react';
import '../../styles/Bruker.css';

const Bruker = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ['Guids', 'Hovedside', 'Konto'];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <div
        key={category}
        className="dropdown-item"
        onClick={() => handleCategorySelect(category)}
      >
        {category}
      </div>
    ));
  };

  return (
    <div>
      <div className="header">
        <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
          <button className="dropdown-button" onClick={toggleDropdown}>
            {selectedCategory || '|||'}
            <span className="arrow">&#9662;</span>
          </button>
          <div className="dropdown-content">{renderCategories()}</div>
        </div>
      </div>
      {selectedCategory && (
        <div className="selected-category">
          Du har valgt kategorien: {selectedCategory}
        </div>
      )}
    </div>
  );
};

export default Bruker;