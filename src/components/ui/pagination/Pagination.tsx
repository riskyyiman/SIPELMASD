import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
};

export default function Pagination({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={`w-10 h-10 rounded-md border ${1 === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}`}>
            1
          </button>
          {pages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} className={`w-10 h-10 rounded-md border ${page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}`}>
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="px-2">...</span>}
          <button onClick={() => onPageChange(totalPages)} className={`w-10 h-10 rounded-md border ${totalPages === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}`}>
            {totalPages}
          </button>
        </>
      )}

      <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
