import React from 'react';

const RadioButton = ({ items, selectedValue, onChange }) => {
  return (
    <div className="flex space-x-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-full px-4 py-2 focus:outline-none cursor-pointer ${
            selectedValue === item.value
              ? 'bg-green-700 text-white'
              : 'bg-white-500 text-black hover:bg-green-700'
          }`}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
