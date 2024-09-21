import React, { useState } from 'react';
import './comp_CSS/dropdown.css';

const Dropdown = ({ options, label, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    onChange(option); // Trigger callback passed from the parent component
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedOption ? selectedOption : label}
      </button>
      <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(option)}
            className={selectedOption === option ? 'active' : ''}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
