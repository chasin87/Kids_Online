import { FETCH_ANSWER_ID } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANSWER_ID:
      return [...action.payload];

    default:
      return state;
  }
};
