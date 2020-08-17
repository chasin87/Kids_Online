import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./pages/Home/";
import Kleuren from "./pages/Kleuren/";
import TicTacToe from "./pages/TicTacToe/";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path="/" component={Home} />;
        <Route path="/kleuren" component={Kleuren} />;
        <Route path="/TicTacToe" component={TicTacToe} />;
      </Switch>
    </div>
  );
}

export default App;
