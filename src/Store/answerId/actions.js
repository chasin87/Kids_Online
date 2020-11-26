import axios from "axios";
import { apiUrl } from "../../config/constants";

export const FETCH_ANSWER_ID = "FETCH_ANSWER_ID";

export const fetchAnswerId = (answersId) => ({
  type: FETCH_ANSWER_ID,
  payload: answersId,
});

export function fetchAnswerListId(id) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/answer/${id}`);

      dispatch(fetchAnswerId(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };
}
