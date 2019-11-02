import React, { Component } from "react";

// Input: liked: boolean
// Output: onClick (who ever is using this component to tell what to render)

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";

    // onClick event in the i element is the DOM onClick element
    // by this.props.onClick we are raising another custom event called "onClick"
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        className={classes}
      ></i>
    );
  }
}

export default Like;
