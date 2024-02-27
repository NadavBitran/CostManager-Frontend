import React, { useState } from 'react';
import "./Addingproduct.css";

export default function AddingProduct({addCost, setItemList}) {

    const [Name, setName] = useState('');
    const [Sum, setSum] = useState('');
    const [Category, setCategory] = useState('');
    const [Description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [sumError, setSumError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    

    function handleSumChange(e) {
        const value = e.target.value;
        const sanitizedValue = value.replace(/^0|\D/g, '');
        const limitedValue = sanitizedValue.slice(0, 10);
        setSum(limitedValue);
    }

    async function addItem() {
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

        const newItemFromDB = await addCost(newItem);
        setItemList((prev) => [...prev, newItemFromDB]);

        setName('');
        setSum('');
        setCategory('');
        setDescription('');
    }

    return (
        <div className={'div-design container'}>
            <input
                type='text'
                placeholder='Enter product name'
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className={'location'}
            />
            <input
                type='text'
                placeholder='Enter sum'
                value={Sum}
                onChange={handleSumChange}
                className={'location'}
            />
            <select
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
                className={'location'}
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
            <button onClick={addItem} className={'location'}>Add item</button>
            <br/>
            {categoryError && <p style={{ color: 'red' }}>{categoryError}</p>}
            {sumError && <p style={{ color: 'red' }}>{sumError}</p>}
            {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
        </div>
    );
}
