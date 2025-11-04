import { useMemo } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <nav className="pagination" aria-label="Pagination navigation">
      <button
        className="pagination__button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        type="button"
      >
        <span aria-hidden="true">←</span> Previous
      </button>

      <div className="pagination__pages" role="list">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span 
              key={`ellipsis-${index}`} 
              className="pagination__ellipsis"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={`pagination__page ${
                currentPage === page ? 'pagination__page--active' : ''
              }`}
              onClick={() => onPageChange(page)}
              disabled={currentPage === page}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        className="pagination__button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        type="button"
      >
        Next <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
};

export default Pagination;