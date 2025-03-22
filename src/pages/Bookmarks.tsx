// src/pages/Bookmarks.tsx
import SearchBar from '../components/SearchBar'
import { Select } from '../components/Select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons'
import { Card, CardProps } from '../components/Card'
import BootstrapPagination from '../components/BootstrapPagination'
import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'

const simulatedData: CardProps[] = Array.from({ length: 27 }, (_, index) => ({
  image:
    'https://www.zaragoza.es/cont/paginas/actividades/imagen/2360.png_1070x713.png',
  title: `Regálame esta noche. Albena Teatro ${index + 1}`,
  location: 'Teatro de las Esquinas',
  rating: 4.1,
  reviews: 116,
  description:
    'Dos viejos amantes se reencuentran después de más de veinticinco años. Una comedia romántica para preguntarnos con quién desearíamos pasar la última noche de nuestra vida.',
}))

function Bookmarks() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 9
  const totalPages = Math.ceil(simulatedData.length / itemsPerPage)
  const currentCards = simulatedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <MainLayout title="Guardados">
      <div className="py-3 row gap-2 justify-content-center">
        <div className="row col-12 col-md-3">
          <SearchBar />
        </div>
        <div className="row col-12 col-md-6 gap-2 gx-2 py-1 flex-nowrap overflow-x-auto hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
          <Select className="col" options={[{ value: '1', label: 'Eventos' }, { value: '2', label: 'Lugares culturales' }]} placeholder="Todos" onChange={(newValue) => console.log(newValue)} />
          <Select className="col" options={[{ value: '1', label: 'Categoría 1' }, { value: '2', label: 'Categoría 2' }, { value: '3', label: 'Categoría 3' }]} placeholder="Categoría" onChange={(newValue) => console.log(newValue)} />
          <button className="col btn rounded-pill shadow-sm text-nowrap">
            Fecha
            <FontAwesomeIcon icon={faArrowDownWideShort} className="ps-2" />
          </button>
          <button className="col btn rounded-pill shadow-sm text-nowrap">
            Comentarios
            <FontAwesomeIcon icon={faArrowDownWideShort} className="ps-2" />
          </button>
        </div>
      </div>
      <div className="row g-4">
        {currentCards.map((card, i) => (
          <div className="col-md-4" key={i}>
            <Card
              image={card.image}
              title={card.title}
              location={card.location}
              rating={card.rating}
              reviews={card.reviews}
              description={card.description}
              className="rounded bg-light shadow"
            />
          </div>
        ))}
      </div>
      <BootstrapPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </MainLayout>
  )
}

export default Bookmarks
