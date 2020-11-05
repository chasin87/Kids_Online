import axios from "axios";
import { apiUrl } from "../../config/constants";

export const FETCH_QUIZ = "FETCH_QUIZ";

export const fetchQuiz = (quizzes) => ({
  type: FETCH_QUIZ,
  payload: quizzes,
});

export function fetchQuizList() {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/upload`);

    dispatch(fetchQuiz(response.data));
  };
}
