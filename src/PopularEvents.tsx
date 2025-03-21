import { Select } from './components/Select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Card } from './components/Card'

function PopularEvents() {
  return (
    <div className='p-5'>
      <div className='d-flex justify-content-between mb-4'>
        <button className='btn btn-light rounded-circle h-100'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Populares</h1>
        <button className='btn btn-light'>Avatar</button>
      </div>
      <div className='d-md-flex'>
        <div className='col-md-6 d-flex flex-column align-items-center'>
          <Select options={[{ value: '1', label: 'Categoría 1' }, { value: '2', label: 'Categoría 2' }, { value: '2', label: 'Categoría 3' }]} placeholder='Categoría' onChange={(newValue) => console.log(newValue)} />
          <h1>Gráfica</h1>
        </div>
        <div className='col-md-6 row g-4'>
          {[...Array(24)].map(() =>
            <div className='col-md-6'>
              <Card image='https://www.zaragoza.es/cont/paginas/actividades/imagen/2360.png_1070x713.png' title='Regálame esta noche. Albena Teatro' location='Teatro de las Esquinas' rating={4.1} reviews={116} description='Dos viejos amantes se reencuentran después de más de veinticinco años desde la última vez que estuvieron juntos. Sus vidas han evolucionado de forma muy diferente, pero ambos coinciden con quien desearían pasar la última noche de su vida. Una comedia romántica que nos hace preguntarnos con quién desearíamos pasar la última noche de nuestra vida.' className='rounded bg-light shadow' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PopularEvents
