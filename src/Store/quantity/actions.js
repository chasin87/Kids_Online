import axios from "axios";
import { apiUrl } from "../../config/constants";

export const FETCH_QUANTITY = "FETCH_QUANTITY";

export const fetchQuantity = (quant, id, name) => ({
  type: FETCH_QUANTITY,
  payload: quant,
  id: id,
  name: name,
});

export function fetchAnswerQuantity(id, name) {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/answer`, { id, name });

    const answersOfQuestion = response.data.map((res) => {
      return res.quizId;
    });
    console.log("id", id);
    const son = answersOfQuestion.filter((aoq) => aoq === id);

    dispatch(fetchQuantity({ qua: son }, id, name));
  };
}
