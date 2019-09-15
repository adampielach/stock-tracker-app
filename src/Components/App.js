import React from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./Layout/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch></Switch>
        <Route path="/" component={Navbar} />
      </div>
    </Router>
  );
}

export default App;
