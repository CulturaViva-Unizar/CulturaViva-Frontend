import SearchBar from './SearchBar';
import { Select } from './Select';
import { DatePicker } from './DatePicker';
import { Range } from './Range';
import { UserMenu } from './UserMenu';

function NavigationBar() {

    return (
        <nav className='row p-3 px-md-5 py-md-4 gap-2 m-0'>
            <div className='row col-10 col-md-3 order-1'>
                <SearchBar />
            </div>
            <div className="row col-12 col-md flex-nowrap overflow-x-auto hide-scrollbar gap-2 gx-2 py-1 order-3 order-md-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                <Select
                    className='col'
                    options={[
                        { value: 'todos', label: 'Todos' },
                        { value: 'eventos', label: 'Eventos' },
                        { value: 'lugares', label: 'Lugares' }
                    ]}
                    initialValue='todos'
                    onChange={(newValue) => console.log(newValue)}
                />
                <Select
                    className='col'
                    options={[
                        { value: 'categoria', label: 'Categoría' },
                        { value: 'arte', label: 'Arte' },
                        { value: 'ocio', label: 'Ocio' }
                    ]}
                    initialValue='categoria'
                    onChange={(newValue) => console.log(newValue)}
                />
                <Range className='col' hideWhenMaxValue={true} initialValue={100} />
                <DatePicker className='col' />
            </div>

            <UserMenu />
        </nav>
    );
}

export default NavigationBar;
