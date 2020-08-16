import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./pages/Home/";
import Kleuren from "./pages/Kleuren/";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path="/" component={Home} />;
        <Route path="/kleuren" component={Kleuren} />;
      </Switch>
    </div>
  );
}

export default App;
