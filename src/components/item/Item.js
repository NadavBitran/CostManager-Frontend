/* Authors:
* Eyal Chachmishvily 209786094
* Idan Eliyahu 204174155
* Nadav Bitran Numa 325122075
*/

// Import React library
import React from 'react';

// Import utility functions
import {convertToFormattedMonthAndYear, 
        convertToImageOfCategory} from '../../utils/convertToUtil';

// Import CSS file
import './Item.css';

// Define Item component
const Item = ({sum, category, description, name, month, year}) => {

  // Render component's card image, additional content and description
  return (
    <div className={'card'}>
        {/* Render the card image */}
        <img src={convertToImageOfCategory(category)} alt={name} className='card-image' />
        
        <div className='card-content'>
            {/* Render the card name */}
            <h2 className='card-name'>{name}</h2>
            
            {/* Render the card price */}
            <p className='card-price'>{sum}</p>
            
            {/* Render the formatted month and year */}
            <p className='card-date'>{convertToFormattedMonthAndYear(month, year)}</p>
            
            {/* Render the card description */}
            <p className='card-description'>{description}</p>
        </div>
    </div>
  );
};

// Export Item component
export default Item;
