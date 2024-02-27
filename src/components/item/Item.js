import React from 'react';


import {convertToFormattedMonthAndYear, convertToImageOfCategory} from '../../utils/ConvertToUtil';

import './Item.css';

const Item = ({sum, category, description, name, month, year}) => {

  return (
    <div className={'card'}>
        <img src={convertToImageOfCategory(category)} alt={name} className='card-image' />
            <div className='card-content'>
                <h2 className='card-name'>{name}</h2>
                <p className='card-price'>{sum}</p>
                <p className='card-date'>{convertToFormattedMonthAndYear(month, year)}</p>
                <p className='card-description'>{description}</p>
            </div>
     </div>
  );
};

export default Item;
