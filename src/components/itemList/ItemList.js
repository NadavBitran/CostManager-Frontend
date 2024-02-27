import Item from '../item/Item';
import React from 'react';

import './ItemList.css';


function ItemList({itemList}) {
    
   return (
    <div className={'itemList container'}>
            {itemList.map((item , index) => (
                <Item 
                    key={index}
                    sum={item.sum}
                    name={item.name}
                    category={item.category}
                    description={item.description}
                    month={item.month}
                    year={item.year} />
            ))}
        
    </div>
  );
};

export default ItemList;
