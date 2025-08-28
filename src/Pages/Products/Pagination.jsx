import React from "react";
import Style from "./Product.module.css"
const Pagination = ({ pages, setCurrentPage, currentPage }) => {
  const generatedPages = [];

  for (let i = 0; i < pages; i++) {
    generatedPages.push(i + 1);
  }

  return (
    <div className="text-center">
      <button
        className={`${ currentPage === 1 ? Style.sub_color : Style.prev}  px-4 py-1 rounded-1 mx-3 border-0 `}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((currentPage = currentPage - 1))}
      >
        prev
      </button>
      {generatedPages.map((pageNumber) => {
        return (
          <button
            className={`${Style.pageNumber} ${currentPage===pageNumber&& Style.page_number_color_after_focus} py-1 px-2`}
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className={`${ currentPage === pages ? Style.sub_color : Style.prev}  px-4 py-1 rounded-1 mx-3 border-0 `}
        disabled={currentPage === pages}
        onClick={() => setCurrentPage((currentPage = currentPage + 1))}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
