// components/GridList.js

import React from 'react';
import styles from './gridList.module.css';
import GridItemHotel from './gridItemHotel';

const GridListHotel = ({ items }) => {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <GridItemHotel hotel={item}></GridItemHotel>
        </div>
      ))}
    </div>
  );
};

export default GridListHotel;
