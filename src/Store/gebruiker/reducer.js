import {
  GEBRUIKER_LOG_OUT,
  GEBRUIKER_LOGIN_SUCCESS,
  GEBRUIKER_TOKEN_STILL_VALID,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  id: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GEBRUIKER_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case GEBRUIKER_LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case GEBRUIKER_TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
