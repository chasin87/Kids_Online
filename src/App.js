import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { selectAppLoading } from "./Store/appState/selectors";
import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./pages/Home/";
import Colors from "./pages/Kleuren/";
import TicTacToe from "./pages/TicTacToe/";
import Memory from "./pages/Memory/";
import QuizFunc from "./pages/Quiz/";
import AdminLog from "./pages/Admin/";
import QuizDash from "./pages/QuizDashboard/";
import MessageBox from "./Components/MessageBox";
import Loading from "./Components/Loading";
import QuizQuestions from "./Components/QuizDashboard/Questions_index";
import Add_Question from "./Components/QuizDashboard/Add_Question";
import Answers from "./Components/QuizDashboard/Answers";
import Login from "./pages/Login/";
import SignUp from "./pages/SignUp/";
import QuizGame from "./pages/QuizGame/";
import Rekenen from "./Components/QuizGame/Rekenen";
import Rijmen from "./Components/QuizGame/Rijmen";
import Kleuren from "./Components/QuizGame/Kleuren";

function App() {
  const isLoading = useSelector(selectAppLoading);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      <Switch>
        {isLoading ? <Loading /> : null}
        <Route exact path="/" component={Home} />;
        <Route path="/colors" component={Colors} />;
        <Route path="/tictactoe" component={TicTacToe} />;
        <Route path="/memory" component={Memory} />;
        <Route path="/Quiz" component={QuizFunc} />;
        <Route path="/Admin" component={AdminLog} />;
        <Route path="/QuizDashboard" component={QuizDash} />;
        <Route path="/QuizQuestions" component={QuizQuestions} />;
        <Route path="/Add_Question" component={Add_Question} />;
        <Route path="/Answers" component={Answers} />;
        <Route path="/Login" component={Login} />;
        <Route path="/SignUp" component={SignUp} />;
        <Route path="/QuizGame" component={QuizGame} />;
        <Route path="/rekenen" component={Rekenen} />;
        <Route path="/rijmen" component={Rijmen} />;
        <Route path="/kleuren" component={Kleuren} />;
      </Switch>
    </div>
  );
}

export default App;
