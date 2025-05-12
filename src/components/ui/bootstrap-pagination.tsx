import React from "react";
import Pagination from "react-bootstrap/Pagination";

interface BootstrapPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPages?: number;
}

const BootstrapPagination: React.FC<BootstrapPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPages = 5,
}) => {
  if (totalPages <= 1) return null;            // nada que paginar

  // ------- 1. Calcular la “ventana” -------------------------
  const half = Math.floor(maxPages / 2);
  let start = Math.max(1, currentPage - half);
  let end   = start + maxPages - 1;

  if (end > totalPages) {
    end   = totalPages;
    start = Math.max(1, end - maxPages + 1);
  }

  const pageNumbers: number[] = [];
  for (let n = start; n <= end; n++) pageNumbers.push(n);

  // ------- 2. Render ---------------------------------------
  return (
    <Pagination className="justify-content-center mt-4 pagination-dark">
      {/* Anterior */}
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {/* Extremo izquierdo + ellipsis */}
      {start > 1 && (
        <>
          <Pagination.Item onClick={() => onPageChange(1)}>1</Pagination.Item>
          {start > 2 && <Pagination.Ellipsis disabled />}
        </>
      )}

      {/* Números visibles */}
      {pageNumbers.map((n) => (
        <Pagination.Item
          key={n}
          active={n === currentPage}
          onClick={() => onPageChange(n)}
        >
          {n}
        </Pagination.Item>
      ))}

      {/* Extremo derecho + ellipsis */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <Pagination.Ellipsis disabled />}
          <Pagination.Item onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Pagination.Item>
        </>
      )}

      {/* Siguiente */}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
};

export default BootstrapPagination;
