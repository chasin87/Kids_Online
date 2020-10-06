import React from "react";
import "./index.css";

import { Link } from "react-router-dom";

export default function DashBoard() {
  return (
    <div className="con">
      <p className="title">QUIZ DASHBOARD</p>
      <div className="tegels">
        <Link className="link_tegel" to="/QuizQuestions">
          Questions
        </Link>
      </div>
    </div>
  );
}
