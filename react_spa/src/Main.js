import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";

// For whatever reason, this won't work but the below will. I should install some form of jslint or jshint or some testing system
// class Main extends Component {
//   render() {
//     return (
// 	<HashRouter>
//         <div>
//           <h1>Simple SPA</h1>
//           <ul className="header">
//             <li><a href="/">Home</a></li>
//             <li><a href="/stuff">Stuff</a></li>
//             <li><a href="/contact">Contact</a></li>
//           </ul>
//           <div className="content">
//              
//           </div>
//         </div>
// 	</HashRouter>
//     );
//   }
// }
//  
// add exact to fix all route showing home content -> on line 45 * exact for both Navlink and route!!!
class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/stuff">Stuff</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/> 
            <Route path="/stuff" component={Stuff}/>
            <Route path="/contact" component={Contact}/>             
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;