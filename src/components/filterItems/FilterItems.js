/* Authors:
* Eyal Chachmishvily 209786094
* Idan Eliyahu 204174155
* Nadav Bitran Numa 325122075
*/

import React, { useState } from 'react';

import './FilterItems.css';

// receives 2 props: onFilter function and getCosts function
const FilterItems = ({ onFilter, getCosts }) => {
    //here we define state variables for month and year
    const [month, setMonth] = useState(''); 
    const [year, setYear] = useState('');
    //hook for displaying error message to the user
    const [error, setError] = useState(''); 

    //validation that user filled both month and year before trying to filter 
    const handleFilter = async () => {

        if (month === '')
        {
            setError('Please select month');
            return;
        }

        if(year === '')
        {
            setError('Please select year');
            return;
        }

        try
        {
            //we call the getCosts function with selected month and year
            const filteredItems = await getCosts(Number(month), Number(year)); 
            onFilter(filteredItems);
            setError(''); //removing error messages
        }
        catch (error)
        {
            //types an error message in case of an error comming from the data base
            setError(error);
        }
    };
    
    return (
        <div className='container filter-container'>
            <select value={month} onChange={(e)=>setMonth(e.target.value)}>
            {/*options for selecting months */}
            <option value='' disabled>Please select the month</option>  
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
            {/*options for selecting years */}
            <option value='' disabled>Please Select the year </option>
            <option value='2023'>2023</option>
            <option value='2024'>2024</option>
            </select>
            <button onClick={handleFilter}>Filter it</button>
            {/* types a warning to the user in case of an empty field */}
            {error && <p className={'errorMessage'}>{error}</p>} 
        </div>
    );
};

export default FilterItems;