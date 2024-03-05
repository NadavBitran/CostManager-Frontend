import React, { useState } from 'react';
import "./AddingItem.css";

export default function AddingItem({addCost, setItemList}) {

    const [Name, setName] = useState('');
    const [Sum, setSum] = useState('');
    const [Category, setCategory] = useState('');
    const [Description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [sumError, setSumError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    
    //function that limits sum to postive numbers only and up to 10 digits
    function handleSumChange(e) {
        const value = e.target.value;
        const sanitizedValue = value.replace(/^0|\D/g, '');
        const limitedValue = sanitizedValue.slice(0, 10);
        setSum(limitedValue);
    }

    async function addItem() {
        //validation checking that user didnt leave any empty fields when trying to add an item
        if (!Name) {
            setNameError('Please enter a product name');
            return;
        } else {
            setNameError('');
        }

        if (Sum === '' || isNaN(Number(Sum))) {
            setSumError('Please enter a valid sum');
            return;
        } else {
            setSumError('');
        }

        if (!Category) {
            setCategoryError('Please select a category');
            return;
        } else {
            setCategoryError('');
        }

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
            {/* types a warning to the user in case of empty field */}
            {categoryError && <p className={'errorMessage'}>{categoryError}</p>}
            {sumError && <p className={'errorMessage'}>{sumError}</p>}
            {nameError && <p className={'errorMessage'}>{nameError}</p>}
        </div>
    );
}
