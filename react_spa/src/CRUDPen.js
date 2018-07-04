import React, { Component } from "react";
let Panel = ReactBootstrap.Panel, Accordion = ReactBootstrap.Accordion;
let Button = ReactBootstrap.Button, Input = ReactBootstrap.Input;
let ButtonToolbar = ReactBootstrap.ButtonToolbar;
let Modal = ReactBootstrap.Modal;
let OverlayTrigger = ReactBootstrap.OverlayTrigger;
let ListGroup = ReactBootstrap.ListGroup,ListGroupItem = ReactBootstrap.ListGroupItem;


// Load Recipe Items or set default Recipe Items
let recipes = (typeof localStorage["recipeBook"] != "undefined") ? JSON.parse(localStorage["recipeBook"]) : [
  {title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"]}, 
  {title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]}, 
  {title: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"]}
], globalTitle = "", globalIngredients = []; // Define global title and ingredients


// RecipeBook class. This holds all recipes.

class RecipeBook extends Component {
  render(){
    return (
      <div>
        <Accordion>
          {this.props.data}
        </Accordion>
      </div>
      )
    }
}


// Recipe class. This is the display for a recipe in RecipeBook
class Recipe extends Component {
  remove() {
    recipes.splice(this.props.index, 1);
    update();
  };
  edit() {
    globalTitle = this.props.title;
    globalIngredients = this.props.ingredients;
    document.getElementById("show").click();
  };
  render() {
    return (
      <div>
        <h4 className="text-center">Ingredients</h4><hr/>
        <IngredientList ingredients={this.props.ingredients} />
        <ButtonToolbar>
          <Button class="delete" bsStyle="danger" id={"btn-del"+this.props.index} onClick={this.remove}>Delete</Button>
          <Button bsStyle="default" id={"btn-edit"+this.props.index} onClick={this.edit}>Edit</Button>
        </ButtonToolbar>
      </div>
    );
  }
}



// IngredientList class. This lists all ingredients for a Recipe
var IngredientList = React.createClass({
  render: function() {
    var ingredientList = this.props.ingredients.map(function(ingredient) {
      return (
        <ListGroupItem>
          {ingredient}
        </ListGroupItem>
      );
    });
    return (
      <ListGroup>
      {ingredientList}
      </ListGroup>
    );
  },
});

// RecipeAdd class. This contains the Modal and Add Recipe button
class RecipeAdd extends Component {
  getInitialState() {
    return { showModal: false };
  };
  close() {
    globalTitle = "";
    globalIngredients = [];
    this.setState({ showModal: false });
  };
  open() {
    this.setState({ showModal: true });
    if (document.getElementById("title") && document.getElementById("ingredients")) {
      $("#title").val(globalTitle);
      $("#ingredients").val(globalIngredients);
      if (globalTitle != "") {
        $("#modalTitle").text("Edit Recipe");
        $("#addButton").text("Edit Recipe");
      }
    }
    else requestAnimationFrame(this.open);
  };
  add() {
    let title = document.getElementById("title").value;
    let ingredients = document.getElementById("ingredients").value.split(",");
    let exists = false;
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].title === title) {
        recipes[i].ingredients = ingredients;
        exists = true;
        break;
      }
    }
    if (!exists) {
      if (title.length < 1) title = "Untitled";
      recipes.push({title: title, ingredients: document.getElementById("ingredients").value.split(",")});
    }
    update();
    this.close();
  };
  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
          id="show"
        >
          Add Recipe
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title id="modalTitle">Add a Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input type="text" label="Recipe" placeholder="Recipe Name" id="title" />
              <Input type="textarea" label="Ingredients" placeholder="Enter Ingredients Separated By Commas" id="ingredients"/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.add} bsStyle="primary" id="addButton">Add Recipe</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


// Update function to display all the recipes
function update() {
  localStorage.setItem("recipeBook", JSON.stringify(recipes));
  var rows = [];
  for (var i=0; i < recipes.length; i++) {
    rows.push(
      <Panel header={recipes[i].title} eventKey={i} bsStyle="success">
        <Recipe title={recipes[i].title} ingredients={recipes[i].ingredients} index={i}/>
      </Panel>
    );
  }
  ReactDOM.render(<RecipeBook data={rows}/>, document.getElementById("container"));
}

// Render the add button (and modal)
ReactDOM.render(<RecipeAdd/>, document.getElementById("button"));
update(); // Initially render the recipe book