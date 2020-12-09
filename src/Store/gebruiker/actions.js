import { apiUrl } from "../../config/constants";
import axios from "axios";
import { gebruikerSelectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const GEBRUIKER_LOGIN_SUCCESS = "GEBRUIKER_LOGIN_SUCCESS";
export const GEBRUIKER_TOKEN_STILL_VALID = "GEBRUIKER_TOKEN_STILL_VALID";
export const GEBRUIKER_LOG_OUT = "GEBRUIKER_LOG_OUT";

const gebruikerLoginSuccess = (gebruikerWithToken) => {
  return {
    type: GEBRUIKER_LOGIN_SUCCESS,
    payload: gebruikerWithToken,
  };
};

const gebruikerTokenStillValid = (gebruikerWithoutToken) => ({
  type: GEBRUIKER_TOKEN_STILL_VALID,
  payload: gebruikerWithoutToken,
});

export const gebruikerLogOut = () => ({ type: GEBRUIKER_LOG_OUT });

export const gebruikerLogin = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/gebruikerlogin`, {
        email,
        password,
      });

      dispatch(gebruikerLoginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "Welkom terug!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const gebruikerGetUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    const gebruikerToken = gebruikerSelectToken(getState());

    if (gebruikerToken === null) {
      return console.log("TOKEN IS NULL");
    }

    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/meGebruiker`, {
        headers: { Authorization: `Bearer ${gebruikerToken}` },
      });

      dispatch(gebruikerTokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }

      dispatch(gebruikerLogOut());
      dispatch(appDoneLoading());
    }
  };
};

export const gebruikerRegistratie = (userName, email, password, level) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        userName,
        email,
        password,
        level,
      });

      dispatch(gebruikerLoginSuccess(response.data));
      dispatch(
        showMessageWithTimeout("success", true, "Registratie Succesvol")
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
