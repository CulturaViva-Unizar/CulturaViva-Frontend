import React from 'react';
import SearchBar from './SearchBar';
import { Select } from './Select';
import { DatePicker } from './DatePicker';
import { Range } from './Range';

function NavigationBar() {
    return (
        <nav className='row w-100 p-3 px-md-5 py-md-4'>
            <SearchBar className='col-8 col-md-4 order-1' />
            <div className='col-12 col-md-4 text-start d-flex order-3 order-md-2'>
                <Select options={[{ value: '1', label: 'Categoría 1' }, { value: '2', label: 'Categoría 2' }]} placeholder='Categoría' onChange={(newValue) => console.log(newValue)} />
                <Range />
                <DatePicker />
            </div>
            <div className='col-4 col-md-4 text-end order-2 order-md-3'>
                <button className='btn btn-dark col-3'>Avatar</button>
            </div>
        </nav>
    );
}

export default NavigationBar;
