import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationList = ({ currentPage, setCurrentPage, totalPage }) => {
  const visiblePageNumber = () => {
    const pages = [];
    if (totalPage < 5) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
      console.log(pages);
    } else {
      if (currentPage < 3) {
        pages.push(1, 2, 3, "...", totalPage);
      } else if (currentPage > totalPage - 2) {
        pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        pages.push(1, "...", currentPage, "...", totalPage);
      }
    }
    return pages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* prev */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage((prev) => prev - 1);
                }
              }}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {visiblePageNumber().map((pageNumber, index) =>
            pageNumber === "..." ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === pageNumber}
                  className="cursor-pointer"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage < totalPage) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
              className={
                currentPage === totalPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationList;
