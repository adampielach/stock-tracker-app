import React from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./Layout/Navbar/Navbar";
import Companies from "./Companies/Companies";
import AddCompany from "./AddCompany/AddCompany";

function App() {
  return (
    <Router>
      <div className="App">
        {/*<Redirect from="/" to="companies" />*/}
        <Route path="/" component={Navbar} />
        <Switch>
          <Route path="/companies" component={Companies} />
          <Route path="/add" component={AddCompany} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
