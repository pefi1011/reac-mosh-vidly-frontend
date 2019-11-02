import React from "react";
import _ from "lodash"; // LODASH is the optimized library of the popular "underscore" library

// Decide on the interface of the component
// What props does it take?
// What events does it raise?
// The good way do make decision is to use the component before implementing it

const Pagination = props => {
  const { pageSize, itemsCount, onPageChange } = props;

  const pageCount = itemsCount / pageSize;

  // the case when the page size is greater than itemCount
  // e.g. pageSize should include 10 items, but we have only 6 items
  // so if we should have only one page, we return null, i.e. nothing will be rendered
  if (pageCount < 1) return null;

  // we use the lodash to generate an array thats going to look like
  // [1, 2, ....., pageCount]
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className="page-item">
            <a
              className="page-link"
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
