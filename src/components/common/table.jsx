import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

// BEFORE
//const Table = props => {
//  const { columns, sortColumn, onSort, data } = props;

// NOW
// // doing destructuring directly in the parameters in stead as first line of the SFC
const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      ></TableHeader>
      <TableBody data={data} columns={columns}></TableBody>
    </table>
  );
};

export default Table;
