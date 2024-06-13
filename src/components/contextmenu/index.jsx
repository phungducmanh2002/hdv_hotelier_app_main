import React from 'react';

const ContextMenu = ({ x, y, onSetAvatar, onDelete }) => {
  return (
    <ul
      style={{
        position: 'absolute',
        top: y,
        left: x,
        listStyle: 'none',
        padding: '10px',
        margin: 0,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      <li style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={onSetAvatar}>
        Chọn làm avatar 
      </li>
      <li style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={onDelete}>
        Xóa ảnh này
      </li>
    </ul>
  );
};

export default ContextMenu;
