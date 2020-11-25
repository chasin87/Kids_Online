import { FETCH_QUANTITY } from "./actions";

const initialState = [];

export default (state = initialState, action, id, name) => {
  switch (action.type) {
    case FETCH_QUANTITY:
      return [{ ...action.payload, id: action.id, name: action.name }];

    default:
      return state;
  }
};
