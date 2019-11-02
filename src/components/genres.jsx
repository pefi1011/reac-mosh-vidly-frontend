import React from "react";
import PropTypes from "prop-types";

const Genres = props => {
  console.log("props: ", props);
  const {
    genres: allItems,
    selectedItem,
    onItemSelect,
    textProperty,
    valueProperty
  } = props;
  console.log("selectedGenre: ", selectedItem);

  const genres = allItems;

  return (
    <React.Fragment>
      <ul className="list-group">
        <li
          key={"all"}
          className={
            selectedItem._id === "all"
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}
          onClick={() => {
            onItemSelect({ _id: "all", name: "All Genres" });
          }}
        >
          All Genres
        </li>
        {genres.map(item => (
          <li
            key={item[valueProperty]}
            className={
              selectedItem._id === item[valueProperty]
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              onItemSelect(item);
            }}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

// SETTING THE DEFAULT VALUES FOR PROP ATTRIBUTES
// So now, we do not have to valueProperty and textProperty when using the Genre component
// we have to pass them only if the valueProperty and textProperty are not the standard
Genres.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  selectedItem: PropTypes.object,
  valueProperty: PropTypes.string.isRequired,
  textProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

export default Genres;
