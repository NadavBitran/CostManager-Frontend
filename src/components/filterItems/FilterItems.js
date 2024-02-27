import React, { useState } from 'react';

const FilterComponent = ({ onFilter, getCosts }) => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleFilter = async () => {
        const filteredItems = await getCosts(Number(month), Number(year));
        onFilter(filteredItems);
    };

    return (
        <div className='container'>
            <input
                type="text"
                placeholder="Month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
            />
            <input
                type="text"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <button onClick={handleFilter}>Filter it</button>
        </div>
    );
};

export default FilterComponent;