import { Card } from '../components/Card'
import { UserMenu } from '../components/UserMenu'
import { GoBackBtn } from '../components/GoBackBtn'

function SuggestedEvents() {
  return (
    <div className='p-3 p-md-5'>
      <div className='row'>
        <div className='col h-100'>
          <GoBackBtn />
        </div>
        <h1 className='col-8 text-center'>Recomendaciones</h1>
        <UserMenu className='col text-end'/>
      </div>
      <div className='mt-3 mb-5 d-flex flex-column align-items-start align-items-md-center justify-content-center'>
        <p>Basadas en tus eventos asistidos anteriormente.</p>
      </div>
      <div className='row g-4'>
        {[...Array(24)].map(() =>
          <div className='col-md-3'>
            <Card image='https://www.zaragoza.es/cont/paginas/actividades/imagen/2360.png_1070x713.png' title='Regálame esta noche. Albena Teatro' location='Teatro de las Esquinas' rating={4.1} reviews={116} description='Dos viejos amantes se reencuentran después de más de veinticinco años desde la última vez que estuvieron juntos. Sus vidas han evolucionado de forma muy diferente, pero ambos coinciden con quien desearían pasar la última noche de su vida. Una comedia romántica que nos hace preguntarnos con quién desearíamos pasar la última noche de nuestra vida.' className='rounded bg-light shadow' />
          </div>
        )}
      </div>
    </div>
  )
}

export default SuggestedEvents
