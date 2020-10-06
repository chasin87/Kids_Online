import React from "react";
import "./index.css";

import { Link } from "react-router-dom";

export default function DashBoard() {
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
      </div>
    </div>
  );
}
