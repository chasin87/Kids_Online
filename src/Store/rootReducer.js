import { combineReducers } from "redux";
import user from "./user/reducer";
import appState from "./appState/reducer";
import quizzes from "./quizlist/reducer";
import answers from "./answerlist/reducer";

export default combineReducers({
  user,
  appState,
  quizzes,
  answers,
});
