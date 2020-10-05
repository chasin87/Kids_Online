import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { selectAppLoading } from "./Store/appState/selectors";
import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./pages/Home/";
import Kleuren from "./pages/Kleuren/";
import TicTacToe from "./pages/TicTacToe/";
import Memory from "./pages/Memory/";
import QuizFunc from "./pages/Quiz/";
import AdminLog from "./pages/Admin/";
import QuizDash from "./pages/QuizDashboard/";
import MessageBox from "./Components/MessageBox";
import Loading from "./Components/Loading";

function App() {
  const isLoading = useSelector(selectAppLoading);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      <Switch>
        {isLoading ? <Loading /> : null}
        <Route exact path="/" component={Home} />;
        <Route path="/kleuren" component={Kleuren} />;
        <Route path="/tictactoe" component={TicTacToe} />;
        <Route path="/memory" component={Memory} />;
        <Route path="/Quiz" component={QuizFunc} />;
        <Route path="/Admin" component={AdminLog} />;
        <Route path="/QuizDashboard" component={QuizDash} />;
      </Switch>
    </div>
  );
}

export default App;
