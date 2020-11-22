import axios from "axios";
import { apiUrl } from "../../config/constants";

export const FETCH_QUIZ = "FETCH_QUIZ";

export const fetchQuiz = (quizzes) => ({
  type: FETCH_QUIZ,
  payload: quizzes,
});

export function fetchQuizList() {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/upload`);

      dispatch(fetchQuiz(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };
}

export const updateStatus = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.patch(`${apiUrl}/upload/${id}`);
    console.log(response.data);
  };
};
