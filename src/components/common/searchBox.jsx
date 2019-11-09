import React from "react";
import Input from "./input";

const SearchBox = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      name="query"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      placeholder="Search...."
    />
  );
};

export default SearchBox;
