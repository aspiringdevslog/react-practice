import React, { Component } from "react";

// Basic form with no functionality
class Form extends Component {
  render(){
    return (
        <form onSubmit="">
          <input type="text" ref="listItem" placeholder="Sample form..." />
          <input type="submit" value="Add" />
        </form>
      )
    }
}
// this class will store the initial items input
class ItemsList extends Component{
  addItem(listName, input){
    localStorage.listName = "input"; 
  }
  retriveItem(listName){
    
  }
}


// Main class
class CRUD extends Component {
  render() {
    return (
      <div>
        <h2>Sample Form</h2><br/>
        <Form />
      </div>
    );
  }
}
 
export default CRUD;