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
          // we can make key more flexible by sending an additional prop which
          // says what property should be used for the key
          // and we could set the default value for this prop like we did it
          // in section 11
          <tr key={item._id}>
            {columns.map(column => (
              // the key like this will work only for the columns without the Like and Delete button
              // because we do not have path property
              // <td key={item._id + column.path} className="">{this.renderCell(item, column)}</td>

              // we will use the logical OR operator
              // if column.path is available, use it, otherwise use column.key
              <td key={item._id + (column.path || column.key)} className="">
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
