import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  // CONVENTION
  // HAVE RENDER() METHOD AS THE LAST METHOD

  renderCell = (item, column) => {
    // if column.content exists, i.e. if its truthy
    // we call that function (content is a function)
    // as an argument, we pass the item (which is the movie in our case)
    if (column.content) return column.content(item);

    // otherwise we render the property of the current item
    return _.get(item, column.path);
  };

  render() {
    // CONVENTION !!!
    // AT THE TOP OF THE RENDER() METHOD WE DO
    // THE OBJECT DESTRUCTURING OF PROPS

    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr>
            {columns.map(column => (
              // we use the bracket annotation to access a property dynamically
              // however, this only works with simple properties
              // <td className="">{item[column.path]}</td>

              // if you are dealing with nested properties, this does not work
              // our nested property is genre.name
              // <td className="">{item["genre.name"]}</td>

              // SO WE USE LODASH AGAIN
              <td className="">{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
