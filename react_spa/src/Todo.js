import React, { Component } from "react";


/* === form input ===== */
class AddForm extends Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" ref="listItem" placeholder="I need to..." />
        <input type="submit" value="Add" />
      </form>
    )
  }

  handleSubmit(e) {
    // when form is submitted, send input value to parent component
    e.preventDefault()
    let val = this.refs.listItem.value
    val && this.props.addItem(val) // only send if value is not empty!
    this.refs.listItem.value = '' // reset input field to blank
  }
}

/* ===== items list ===== */
class Items extends Component {
  render() {
    // grab items array from state, map each item in `li`
    let items = this.props.items.map((item, key) => { // it seems map is some form of loop
      return <li className="todo" key={key} onClick={this.handleRemove.bind(this)}>{item}</li>
    })
    return (
      <ul>
        {items}
      </ul>
    )
  }
  handleRemove(item) {
    this.props.removeItem(item.currentTarget.innerText) // pass value of item to delete to parent component
  }
}

/* ===== comppleted list ===== */
// class Completed extends Component {

// }

/* ===== parent component ===== */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { items: [] }
  }
  render() {
    // outputting child components while passing state + callback functions
    return (
      <div>
        <AddForm addItem={this.addItem.bind(this)} />
        <Items items={this.state.items} removeItem={this.removeItem.bind(this)} />

      </div>
    )
  }
  addItem(item) {
    // getting input value from child component --> adding it to state items array
    this.setState({
      items: this.state.items.concat(item)
    })
  }
  removeItem(value) {
    // filter method --> taking out item that matches value of clicked item
    let filtered = this.state.items.filter((item) =>{
      return item !== value
    })
    // setting the filtered array as new state --> all items minus clicked item
    this.setState({
      items: filtered
    })
  }
  transferItem(){
    // this will display the filtered items in another view

  }
  componentWillMount() {
    // load items array from localStorage, set in state
    let itemsList = localStorage.getItem('items')
    if (itemsList) {
      this.setState({
        items: JSON.parse(localStorage.getItem('items'))
      })
    }
  }
  componentDidUpdate() {
    // on each update, sync our state with localStorage
    localStorage.setItem('items', JSON.stringify(this.state.items))
  }
}


export default App;
// React.render(<App />, document.getElementById('app'))