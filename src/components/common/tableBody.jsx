import React, { Component } from "react";
import Like from "./like";
import _ from "lodash";

class TableBody extends Component {
  state = {};
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
              <td className="">{_.get(item, column.path)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
