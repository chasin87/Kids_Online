import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path="/" component={Home} />;
      </Switch>
    </div>
  );
}

export default App;
