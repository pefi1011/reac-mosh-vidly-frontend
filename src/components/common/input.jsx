import React from "react";

// USING THE REST OPERATOR TO GET THE OTHER PROPERTIES OF THE PROPS OBJECT
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/** Convert the input component to a controlled component. Controlled component do not have their own state,
  they get all their data via props and they notify changes on the data by raising events 
  add "value" attribute and onChange event
  */}

      {/** instead of having 
    value={value}
    onChange={onChange}
    type={type}
    
    we will apply the spread operator to the rest
    */}
      <input {...rest} name={name} id={name} className="form-control" />
      {/** WE RENDER THE DIV ELEMENT ONLY IF THERE ARE ERRORS. IF ERROR DOES NOT EXIST (ITS FALSY), THEN THE EXPRESSION IS FALSE */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
