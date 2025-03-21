import SearchBar from '../components/SearchBar'
import { Select } from '../components/Select'
import { UserMenu } from '../components/UserMenu'
import { Range } from '../components/Range'
import { DatePicker } from '../components/DatePicker'

function App() {

  return (
    <div className='gx-0'>
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
        <UserMenu className='col-2 col-md text-end order-2 order-md-3' />
      </nav>
      <div>

      </div>
    </div>
  )
}

export default App
