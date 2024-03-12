/* Authors:
* Eyal Chachmishvily 209786094
* Idan Eliyahu 204174155
* Nadav Bitran Numa 325122075
*/

// Importing the necessary dependencies
import Item from '../item/Item';
import React from 'react';

// Importing the CSS file for styling
import './ItemList.css';

// Defining the ItemList component
const ItemList = ({itemList}) => {
    
   return (
    <div className={'itemList container'}>
            {/* Mapping through the itemList array and rendering each item */}
            {itemList.length > 0 ? (itemList.map((item , index) => (
                <Item 
                    key={index}
                    sum={item.sum}
                    name={item.name}
                    category={item.category}
                    description={item.description}
                    month={item.month}
                    year={item.year} />
            ))) : (
                <p className={'noItemsMessage'}>No items to display</p>
            )}
        
    </div>
  );
};

// Exporting the ItemList component as the default export
export default ItemList;
