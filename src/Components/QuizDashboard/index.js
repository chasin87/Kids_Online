import React, { useEffect } from "react";
import "./index.css";
import { fetchAnswerQuantity } from "../../Store/quantity/actions";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DashBoard() {
  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnswerQuantity());
  }, [dispatch]);

  return (
    <div className="con">
      <p className="title">QUIZ DASHBOARD</p>
      <div className="tegels_all">
        <Link className="link_question" to="/QuizQuestions">
          <button className="tegels_question">Vragen</button>
        </Link>
        <Link className="link_add_question" to="/Add_Question">
          <button className="tegels_add_question">Nieuwe vraag</button>
        </Link>
        <Link className="link_add_answers" to="/Answers">
          <button className="tegels_add_answers">Nieuwe Antwoorden</button>
        </Link>
      </div>
    </div>
  );
}
