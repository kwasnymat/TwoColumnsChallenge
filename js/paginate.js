const paginate = (totalItems, currentPage, pageSize, maxPages, photos) => {
    let numberOfPages = Math.ceil(totalItems / pageSize);
    let startPage;
    let endPage;

    if (numberOfPages <= maxPages) {
        startPage = 1;
        endPage = numberOfPages;
    } else {
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= numberOfPages) {
            startPage = numberOfPages - maxPages + 1;
            endPage = numberOfPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize, totalItems - 1);
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
        i => startPage + i
    );

    return {
        totalItems,
        currentPage,
        pageSize,
        numberOfPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages,
        photos
    };
};

export default paginate;