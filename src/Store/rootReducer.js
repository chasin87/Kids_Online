import { combineReducers } from "redux";
import user from "./user/reducer";
import appState from "./appState/reducer";

export default combineReducers({
  user,
  appState,
});
