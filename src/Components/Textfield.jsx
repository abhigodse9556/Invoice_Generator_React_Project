import './comp_CSS/textfield.css';
import React, { useState } from 'react';

const TextField = ({ label, placeholder, type = "text", value, onChange, disabled, name }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <div className='text-field-div'>
      <div className={`textfield-container ${focused || value ? 'focused' : ''}`}>
        {/* Floating label */}
        <label className={`textfield-label ${value || focused ? 'filled' : ''}`}>
          {label}
        </label>
        
        {/* Input field */}
        <input
          type={type}
          value={value}  // Controlled input value
          className="textfield-input"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => onChange(e.target.value, name)}  // Pass value and name
          disabled={disabled}  // Handle disabled state
        />
      </div>
    </div>
  );
};

export default TextField;
