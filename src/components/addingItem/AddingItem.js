import React, { useState } from 'react';
import "./AddingItem.css";

export default function AddingItem({addCost, setItemList}) {
    //hooks for getting user input
    const [Name, setName] = useState('');
    const [Sum, setSum] = useState('');
    const [Category, setCategory] = useState('');
    const [Description, setDescription] = useState('');

    const [inputError, setInputError] = useState(''); //hook for checking that all fields were filled
    
    //function that limits sum to postive numbers only and up to 10 digits
    function handleSumChange(e) {
        const value = e.target.value;
        const sanitizedValue = value.replace(/^0|\D/g, '');
        const limitedValue = sanitizedValue.slice(0, 10);
        setSum(limitedValue);
    }

    async function addItem() {
        //validation for checking that user didnt leave any empty fields when trying to add an item
        if (!Name) {
            setInputError('Please enter a product name');
            return;
        } else {
            setInputError('');
        }

        if (Sum === '' || isNaN(Number(Sum))) {
            setInputError('Please enter a valid sum');
            return;
        } else {
            setInputError('');
        }

        if (!Category) {
            setInputError('Please select a category');
            return;
        } else {
            setInputError('');
        }

        //creates a new cost item
        const newItem = {
            name: Name,
            sum: Sum,
            category: Category.toUpperCase(),
            description: Description || 'No description added'
        };

        //adds the new item to the data base
        const newItemFromDB = await addCost(newItem);
        setItemList((prev) => [...prev, newItemFromDB]);

        //clear user input after successuly adding a new item
        setName('');
        setSum('');
        setCategory('');
        setDescription('');
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
            {inputError && <p className={'errorMessage'}>{inputError}</p>}
        </div>
    );
}
