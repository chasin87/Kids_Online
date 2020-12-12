import React, { useEffect, useState } from "react";
import "./index.css";
import { fetchAnswerQuantity } from "../../Store/quantity/actions";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { selectquizzes } from "../../Store/quizlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";

export default function DashBoard() {
  const { token } = useSelector(selectUser);

  const Quizzes = useSelector(selectquizzes);

  const history = useHistory();
  if (token === null) {
    history.push("/");
  }

  const dispatch = useDispatch();

  const BadgeAnswer = Quizzes.map((quiz) => {
    if (quiz.questionComplete === false) {
      return 1;
    } else {
      return 0;
    }
  });

  const setBa = BadgeAnswer.filter((ba) => ba === 1);

  useEffect(() => {
    dispatch(fetchAnswerQuantity());
    dispatch(fetchQuizList());
  }, [dispatch]);

  return (
    <div className="con">
      <p className="title">QUIZ DASHBOARD</p>

      <div className="tegels_all">
        <Link className="link_question" to="/QuizQuestions">
          <div className="missing_badge">{setBa.length}</div>
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
