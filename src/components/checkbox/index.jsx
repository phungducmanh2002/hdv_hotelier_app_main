// components/CheckboxList.js
import React from 'react';

const CheckboxList = ({ options, selectedOptions, setSelectedOptions }) => {
  const handleCheckboxChange = (value) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((option) => option !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  return (
    <div>
      <h2>Select Options</h2>
      {options.map((option) => (
        <div key={option.value}>
          <label>
            <input
              type="checkbox"
              value={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
            {option.label}
          </label>
        </div>
      ))}
     
    </div>
  );
};

export default CheckboxList;
