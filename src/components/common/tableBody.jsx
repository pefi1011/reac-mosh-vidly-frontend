import React, { Component } from "react";
import Like from "./like";

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
              <td className="">{item.genre.name}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
