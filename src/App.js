import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { selectAppLoading } from "./Store/appState/selectors";
import ReactGA from "react-ga";
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
import QuizQuestions from "./Components/QuizDashboard/Questions_index";
import Add_Question from "./Components/QuizDashboard/Add_Question";
function App() {
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    ReactGA.initialize("G-KHRLSCPPN2");
  });

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
        <Route path="/QuizQuestions" component={QuizQuestions} />;
        <Route path="/Add_Question" component={Add_Question} />;
      </Switch>
    </div>
  );
}

export default App;
