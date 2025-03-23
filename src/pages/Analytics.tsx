import MainLayout from '../layouts/MainLayout'
import ChartCard from '../components/ChartCard'
import { Select } from '../components/Select'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import DoughnutChart from '../components/DoughnutChart'

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const barChartData = {
  labels: labels,
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 30, 100, 82, 75, 66],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1
    },
  ],
}

const lineChartData = {
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 30, 100, 82, 75, 66],
      borderColor: 'rgb(75, 192, 192)',
    },
  ],
}

const doughnutChartData = {
  labels: labels,
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 30, 100, 82, 75, 66],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(89, 255, 86)',
        'rgb(255, 86, 207)',
        'rgb(216, 86, 255)',
        'rgb(86, 255, 216)',
        'rgb(103, 86, 255)',
        'rgb(86, 255, 196)',
        'rgb(199, 86, 255)',
        'rgb(0, 0, 0)',
        'rgb(244, 255, 86)'
      ],
      hoverOffset: 4
    },
  ],
}

function Analytics() {
  return (
    <MainLayout title="Analíticas">
      <div className='row g-4 mt-2'>
        <div className='col-12 col-md-6'>
          <ChartCard title={'Visitas de la web'}>
            <LineChart data={lineChartData} />
          </ChartCard>
        </div>
        <div className='col-12 col-md-6'>
          <ChartCard title={'Eventos guardados'}>
            <BarChart data={barChartData} />
          </ChartCard>
        </div>
        <div className='col-12 col-md-4'>
          <ChartCard title={'Comentarios añadidos vs. eliminados'}>
            <DoughnutChart data={doughnutChartData} />
          </ChartCard>
        </div>
        <div className='col-12 col-md-6'>
          <ChartCard title={'Usuarios deshabilitados'}>
          <BarChart data={barChartData} />
          </ChartCard>
        </div>
        <div className='row flex-column col-12 col-md-2 g-3'>
          <div className="card p-0">
            <div className='card-header d-flex flex-column align-items-center justify-content-between py-3 gap-2'>
              <h5>Usuarios totales</h5>
              <Select
                options={[
                  { value: "todos", label: "Todos" },
                  { value: "habilitados", label: "Habilitados" },
                  { value: "deshabilitados", label: "Deshabilitados" },
                ]}
                initialValue="todos"
                onChange={(newValue) => console.log(newValue)}
              />
            </div>
            <div className="card-body text-center">
              <h1>2000</h1>
            </div>
          </div>
          <div className="card p-0">
            <div className='card-header d-flex flex-column align-items-center justify-content-between py-3 gap-2'>
              <h5>Eventos totales</h5>
              <Select
                options={[
                  { value: "categorias", label: "Categorías" },
                  { value: "arte", label: "Arte" },
                  { value: "ocio", label: "Ocio" },
                ]}
                initialValue="categorias"
                onChange={(newValue) => console.log(newValue)}
              />
            </div>
            <div className="card-body text-center">
              <h1>120</h1>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Analytics
