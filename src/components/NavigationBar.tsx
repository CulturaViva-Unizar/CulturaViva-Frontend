import React from 'react';
import SearchBar from './SearchBar';
import { Select } from './Select';
import { DatePicker } from './DatePicker';
import { Range } from './Range';

function NavigationBar() {
    return (
        <nav className='row w-100 p-3 px-md-5 py-md-4 gx-3 m-0'>
            <div className='col-10 col-md-3 order-1'>
                <SearchBar />
            </div>
            <div className='col-md row mt-3 mt-md-0 order-3 order-md-2 gx-5' style={{ overflowX: 'scroll', width: 'auto', maxWidth: 'unset' }}>
                <Select className='col me-2' options={[{ value: '1', label: 'Categoría 122222222222222' }, { value: '2', label: 'Categoría 2' }]} placeholder='Categoría' onChange={(newValue) => console.log(newValue)} />
                <Range className='col me-2' />
                <DatePicker className='col' />
            </div>
            <div className='col-2 col-md text-end order-2 order-md-3'>
                <button className='btn btn-dark col-3'>Avatar</button>
            </div>
        </nav>
    );
}

export default NavigationBar;
