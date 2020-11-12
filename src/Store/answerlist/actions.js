import axios from "axios";
import { apiUrl } from "../../config/constants";

export const FETCH_ANSWER = "FETCH_ANSWER";

export const fetchAnswer = (answers) => ({
  type: FETCH_ANSWER,
  payload: answers,
});

export function fetchAnswerList() {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/answer`);

    dispatch(fetchAnswer(response.data));
  };
}
