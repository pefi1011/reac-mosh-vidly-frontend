import React, { Component } from "react";
import Joi from "joi-browser";
import Select from "./select";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    // If the error is truthy, we return the error msg otherwise null
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const joiOptions = {
      abortEarly: false
    };

    const { error } = Joi.validate(this.state.data, this.schema, joiOptions);

    // no validation error founds
    if (!error) return null;

    const errors = {};

    // mapping an array into object
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    // we are not calling
    // this.validate()
    // bc we just want to validate the current field, not the entire form!
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    // If there are errors, we set the error for the given field
    // otherwise we delete them
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // we use the spread opperator to clone the data object from the state
    const data = { ...this.state.data };

    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    // If errors is truthy (it exists), then we pass errors to the state, otherwise we pass an empty object
    this.setState({ errors: errors || {} });

    // if there are any errors, we return, i.e. we abort the form submition. We do not call the server
    if (errors) return;

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  // default value of type is "text"
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors, gen } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
