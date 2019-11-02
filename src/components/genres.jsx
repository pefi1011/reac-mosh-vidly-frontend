import React from "react";
import PropTypes from "prop-types";

const Genres = props => {
  console.log("props: ", props);
  const {
    genres: allGenres,
    selectedGenre,
    onItemSelect,
    textProperty,
    valueProperty
  } = props;
  console.log("selectedGenre: ", selectedGenre);

  const genres = allGenres;

  return (
    <React.Fragment>
      <ul className="list-group">
        <li
          key={"all"}
          className={
            selectedGenre._id === "all"
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
        {genres.map(genre => (
          <li
            key={genre[valueProperty]}
            className={
              selectedGenre._id === genre[valueProperty]
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              onItemSelect(genre);
            }}
          >
            {genre[textProperty]}
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
  valueProperty: "id",
  textProperty: "name"
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  selectedGenre: PropTypes.object,
  valueProperty: PropTypes.string.isRequired,
  textProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

export default Genres;
