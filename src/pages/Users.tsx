import { UserCard, UserCardProps } from '../components/UserCard'
import SearchBar from '../components/SearchBar'
import { Select } from '../components/Select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import BootstrapPagination from '../components/BootstrapPagination'
import MainLayout from '../layouts/MainLayout'

const simulatedData: UserCardProps[] = Array.from({ length: 27 }, (_, index) => ({
  user: `User ${index + 1}`,
  isEnabledInit: true,
  totalComments: 40,
  deletedComments: 10
}))

function Users() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 9
  const totalPages = Math.ceil(simulatedData.length / itemsPerPage)

  const currentCards = simulatedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <MainLayout title="Usuarios">
      <div className="py-3 row gap-2 justify-content-center">
        <div className="row col-12 col-md-3">
          <SearchBar />
        </div>
        <div
          className="row col-12 col-md-3 gap-2 gx-2 py-1 flex-nowrap overflow-x-auto hide-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <Select
            className='col'
            options={[
              { value: 'todos', label: 'Todos' },
              { value: 'habilitados', label: 'Habilitados' },
              { value: 'deshabilitados', label: 'Deshabilitados' }
            ]}
            initialValue='todos'
            onChange={(newValue) => console.log(newValue)}
          />
          <button className="col btn rounded-pill shadow-sm text-nowrap">
            Comentarios
            <FontAwesomeIcon icon={faArrowDownWideShort} className="ps-2" />
          </button>
        </div>
      </div>
      <div className="row g-4">
        {currentCards.map((card, i) => (
          <div className="col-md-4" key={i}>
            <UserCard
              className="rounded bg-light shadow"
              user={card.user}
              totalComments={card.totalComments}
              deletedComments={card.deletedComments}
              isEnabledInit={card.isEnabledInit}
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

export default Users
