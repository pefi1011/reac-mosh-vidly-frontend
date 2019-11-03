import React, { Component } from "react";

// Input:
// columns: array
// onSort: function
// sortColumn: object
class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    // WE ARE RAISING THE onSort EVENT!!
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    // we do not want to render any icon if the current column is different than the sortColumn
    if (column.path !== sortColumn.path) return null;

    // otherwise this column is sorted
    // and we have to render a different icon based on the sort order
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              // using the logical OR operator
              // if column.path exist, we are going to use it
              // otherwise we will use column.key
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
