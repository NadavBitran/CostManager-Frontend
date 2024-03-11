import React, { useState } from 'react';

import "./FilterItems.css";

// receives 2 props: onFilter function and getCosts function
const FilterComponent = ({ onFilter, getCosts }) => {
    const [month, setMonth] = useState(''); //here we define state variables for month and year
    const [year, setYear] = useState('');
    const [inputError, setInputError] = useState(''); //hook for checking that all fields were filled

    //validation that user filled both month and year before trying to filter 
    const handleFilter = async () => {

        if (month === '')
        {
            setInputError('Please select month');
            return;
        }

        if(year === '')
        {
            setInputError('Please select year');
            return;
        }

        const filteredItems = await getCosts(Number(month), Number(year)); //we call the getCosts function with selected month and year
        onFilter(filteredItems);

        setInputError(''); //removing warning for missing user input

    };



    return (
        <div className='container filter-container'>
            <select value={month} onChange={(e)=>setMonth(e.target.value)}>
            <option value='' disabled>Please select the month</option>  {/*options for selecting months */}
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
            </select>
            <select value={year} onChange={(e)=>setYear(e.target.value)}>
            <option value='' disabled>Please Select the year </option>{/*options for selecting years */}
            <option value='2023'>2023</option>
            <option value='2024'>2024</option>
            </select>
            <button onClick={handleFilter}>Filter it</button>
            {inputError && <p className={'errorMessage'}>{inputError}</p>} {/* types a warning to the user in case of an empty field */}
        </div>
    );
};

export default FilterComponent;