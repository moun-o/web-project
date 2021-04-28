import { Route, Router, Switch } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import { createBrowserHistory } from "history";
import Details from "./components/Details";

const history = createBrowserHistory();
export default function Routing({ children }) {
  return (
    <Router history={history}>
      {children}
      <Switch>
        <Route exact path="/" component={() => <Home />}></Route>
        <Route exact path="/station/:id" component={() => <Details />}></Route>
      </Switch>
    </Router>
  );
}
