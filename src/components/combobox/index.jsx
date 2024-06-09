import React, { useState, useEffect } from 'react';

const Combobox = ({options, label, onChange, name}) => {
    const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    onChange(e);
  };

  return (
    <div className='flex justify-between items-center mb-2'>
      <label htmlFor="combobox" className='mr-2'>{label}</label>
      <select id="combobox" value={selectedValue} onChange={handleChange} className='p-1 w-52' name={name} >
        <option value="" disabled>Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Combobox