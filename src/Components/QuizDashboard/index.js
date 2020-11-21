import React from "react";
import "./index.css";

import { useSelector } from "react-redux";
import { selectUser } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DashBoard() {
  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }

  return (
    <div className="con">
      <p className="title">QUIZ DASHBOARD</p>
      <div className="tegels_all">
        <Link className="link_question" to="/QuizQuestions">
          <button className="tegels_question">Questions</button>
        </Link>
        <Link className="link_add_question" to="/Add_Question">
          <button className="tegels_add_question">Add Question</button>
        </Link>
        <Link className="link_add_answers" to="/Answers">
          <button className="tegels_add_answers">Add Answers</button>
        </Link>
      </div>
    </div>
  );
}
