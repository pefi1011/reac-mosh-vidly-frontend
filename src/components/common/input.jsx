import React from "react";

const Input = ({ name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/** Convert the input component to a controlled component. Controlled component do not have their own state,
  they get all their data via props and they notify changes on the data by raising events 
  add "value" attribute and onChange event
  */}
      <input
        value={value}
        onChange={onChange}
        autoFocus
        name={name}
        id={name}
        type="text"
        className="form-control"
      />
      {/** WE RENDER THE DIV ELEMENT ONLY IF THERE ARE ERRORS. IF ERROR DOES NOT EXIST (ITS FALSY), THEN THE EXPRESSION IS FALSE */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
