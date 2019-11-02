import React from "react";
import _ from "lodash"; // LODASH is the optimized library of the popular "underscore" library

// Decide on the interface of the component
// What props does it take?
// What events does it raise?
// The good way do make decision is to use the component before implementing it

const Pagination = props => {
  const { pageSize, itemsCount, onPageChange } = props;

  const pageCount = itemsCount / pageSize;

  // we use the lodash to generate an array thats going to look like
  // [1, 2, ....., pageCount]
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className="page-item">
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
