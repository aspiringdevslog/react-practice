import React, { Component } from "react";

// Basic form with no functionality
class Form extends Component {

  render(action,placeholder,buttonValue){

    return (
        <form onSubmit={action}>
          <input type="text" ref="listItem" placeholder={placeholder} />
          <input type="submit" value={buttonValue} />
        </form>
      )
    }
}

export default Form;