import { combineReducers } from "redux";
import user from "./user/reducer";
import appState from "./appState/reducer";
import quizzes from "./quizlist/reducer";
import answers from "./answerlist/reducer";
import quant from "./quantity/reducer";
import answersId from "./answerId/reducer";

export default combineReducers({
  user,
  appState,
  quizzes,
  answers,
  quant,
  answersId,
});
