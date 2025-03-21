import { UserCard } from './components/UserCard'
import SearchBar from './components/SearchBar'
import { Select } from './components/Select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownWideShort, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Users() {
  return (
    <div className='p-5'>
      <div className='d-flex justify-content-between'>
        <button className='btn btn-light rounded-circle h-100'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Usuarios</h1>
        <button className='btn btn-light'>Avatar</button>
      </div>
      <div className='mt-3 mb-5 d-flex flex-column align-items-start align-items-md-center justify-content-center'>
        <div className='col-12 col-md-5'>
          <SearchBar />
        </div>
        <div className='d-flex gap-3 mt-3'>
          <Select options={[{ value: '1', label: 'Habilitados' }, { value: '2', label: 'Deshabilitados' }]} placeholder='Todos' onChange={(newValue) => console.log(newValue)} />
          <button className='btn btn-light rounded-pill text-nowrap'>
            Comentarios
            <FontAwesomeIcon icon={faArrowDownWideShort} className='ps-2' />
          </button>
        </div>
      </div>
      <div className='row g-5'>
        {[...Array(24)].map(() =>
          <div className='col-md-3'>
            <UserCard user='User' totalComments={40} deletedComments={10} isEnabledInit={true} className='rounded bg-light shadow' />
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
