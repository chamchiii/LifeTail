const Pagination = ({
  totalCount,
  countPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageList = [];
  let totalPages = Math.ceil(totalCount / countPerPage);

  if (totalPages === 0) {
    totalPages = 1;
  }

  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  const toNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const toPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  //   if (totalPages === 1) {
  //     return null;
  //   }

  return (
    <div className="Pagination">
      <button
        className="prevNext"
        onClick={toPrevPage}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pageList.map((page) => (
        <button
          className={currentPage === page ? "active" : ""}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="prevNext"
        onClick={toNextPage}
        disabled={currentPage === totalPages || currentPage === 1}
      >
        &gt;
      </button>
    </div>
  );
};
Pagination.defaultProps = {
  countPerPage: 10,
};

export default Pagination;
