/* Authors:
* Eyal Chachmishvily 209786094
* Idan Eliyahu 204174155
* Nadav Bitran Numa 325122075
*/

import React, { useState } from 'react';
import './AddingItem.css';

const AddingItem = ({addCost, setItemList}) => {
    //hooks for getting user input
    const [Name, setName] = useState('');
    const [Sum, setSum] = useState('');
    const [Category, setCategory] = useState('');
    const [Description, setDescription] = useState('');
    //hook for displaying error message to the user
    const [error, setError] = useState(''); 
    
    //function that limits sum to postive numbers only and up to 10 digits
    function handleSumChange(e) {
        const value = e.target.value;
        const sanitizedValue = value.replace(/^0|\D/g, '');
        const limitedValue = sanitizedValue.slice(0, 10);
        setSum(limitedValue);
    }

    async function addItem() {
        /*validation for checking that user didnt 
        leave any empty fields when trying to add an item*/
        if (!Name) {
            setError('Please enter a product name');
            return;
        }

        if (Sum === '' || isNaN(Number(Sum))) {
            setError('Please enter a valid sum');
            return;
        }

        if (!Category) {
            setError('Please select a category');
            return;
        }

        //creates a new cost item
        const newItem = {
            name: Name,
            sum: Sum,
            category: Category.toUpperCase(),
            description: Description || 'No description added'
        };


        try
        {
            //adds the new item to the data base
            const newItemFromDB = await addCost(newItem);
            setItemList((prev) => [...prev, newItemFromDB]);
            setError(''); //removing error messages

            //clear user input after successuly adding a new item
            setName('');
            setSum('');
            setCategory('');
            setDescription('');
        }
        catch (error)
        {
            //types an error message in case of an error comming from the data base
            setError(error);
        }
    }

    return (
        <div className={'add-container container'}>
            <input
                type='text'
                placeholder='Enter product name'
                value={Name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='text'
                placeholder='Enter sum'
                value={Sum}
                onChange={handleSumChange}
            />
            <select
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value='' disabled>Select category</option>
                <option value='Food'>Food</option>
                <option value='Health'>Health</option>
                <option value='Education'>Education</option>
                <option value='Travel'>Travel</option>
                <option value='Housing'>Housing</option>
                <option value='Other'>Other</option>
            </select>
            <input
                type='text'
                placeholder='Enter product Description'
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={addItem}>Add item</button>
            {/* types a warning to the user in case of an empty field */}
            {error && <p className={'errorMessage'}>{error}</p>}
        </div>
    );
};

export default AddingItem;