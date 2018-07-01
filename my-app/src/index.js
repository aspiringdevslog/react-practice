import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Leslie',
  lastName: 'Tang'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

const hello = (
  <h1>
    Hi there, {formatName(user)}!
  </h1>
);

// ========================================

function Welcome(props) {
  return <h1> Hello, {props.name} </h1>;
}

class WelcomeClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// ========================================

ReactDOM.render(
  element,
  document.getElementById('root')
);

ReactDOM.render(
  hello,
  document.getElementById('hello')
);

const functionCall = <Welcome name="Popeye" />;

ReactDOM.render(
  functionCall,
  document.getElementById('function')
);

ReactDOM.render(
  <Welcome name="Not Popeye"/>,
  document.getElementById('function')
);


ReactDOM.render(
  <WelcomeClass name="Classes" />,
  // <WelcomeClass name="Classes 2" />,
  document.getElementById('class')
);