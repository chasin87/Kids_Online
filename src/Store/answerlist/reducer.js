import { FETCH_ANSWER } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANSWER:
      return [...action.payload];

    default:
      return state;
  }
};
