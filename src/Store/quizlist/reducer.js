import { FETCH_QUIZ } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZ:
      return [...action.payload];

    default:
      return state;
  }
};
