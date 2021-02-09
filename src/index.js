import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign_in" component={SignIn} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
