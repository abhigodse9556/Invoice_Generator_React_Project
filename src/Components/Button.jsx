import React from 'react';
import './comp_CSS/button.css';

const Button = ({ onClick, label }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
