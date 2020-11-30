import {
  GEBRUIKER_LOG_OUT,
  GEBRUIKER_LOGIN_SUCCESS,
  GEBRUIKER_TOKEN_STILL_VALID,
} from "./actions";

const initialStates = {
  gebruikerToken: localStorage.getItem("gebruikerToken"),
  userName: localStorage.getItem("gebruikeruserName"),
  email: localStorage.getItem("gebruikeremail"),
  level: localStorage.getItem("gebruikerlevel"),
};

export default (state = initialStates, action) => {
  switch (action.type) {
    case GEBRUIKER_LOGIN_SUCCESS:
      localStorage.setItem("gebruikerToken", action.payload.gebruikerToken);
      localStorage.setItem("gebruikeruserName", action.payload.userName);
      localStorage.setItem("gebruikeremail", action.payload.email);
      localStorage.setItem("gebruikerlevel", action.payload.level);

      return { ...state, ...action.payload };

    case GEBRUIKER_LOG_OUT:
      localStorage.removeItem("gebruikerToken");
      localStorage.removeItem("gebruikeruserName");
      localStorage.removeItem("gebruikeremail");
      localStorage.removeItem("gebruikerlevel");
      return {
        ...initialStates,
        gebruikerToken: null,
        userName: null,
        email: null,
        level: null,
      };

    case GEBRUIKER_TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
