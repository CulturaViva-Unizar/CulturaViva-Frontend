import { Select } from '../components/Select'
import { Card } from '../components/Card'
import { UserMenu } from '../components/UserMenu'
import { GoBackBtn } from '../components/GoBackBtn'
import PieChart from '../components/PieChart'

function NextEvents() {
  const pieData = {
    labels: ["Rojo", "Azul", "Amarillo"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4F74", "#2A92D6", "#FFB400"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const, // TypeScript requiere 'as const'
      },
    },
  };

  return (
    <div className='p-3 p-md-5'>
      <div className='row mb-4'>
        <div className='col h-100'>
          <GoBackBtn />
        </div>
        <h1 className='col-8 text-center'>Próximos</h1>
        <UserMenu className='col text-end'/>
      </div>
      <div className='d-md-flex'>
        <div className='col-md-6 d-flex flex-column align-items-center'>
          <Select options={[{ value: '1', label: 'Categoría 1' }, { value: '2', label: 'Categoría 2' }, { value: '2', label: 'Categoría 3' }]} placeholder='Categoría' onChange={(newValue) => console.log(newValue)} />
          <PieChart data={pieData} options={pieOptions} className="m-4" />
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

export default NextEvents
