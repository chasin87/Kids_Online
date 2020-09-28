import React from "react";
import "./index.css";

import { useSelector } from "react-redux";
import { selectUser } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";

export default function QuizDashboard() {
  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }

  return <p className="Titles">QUIZ DASHBOARD</p>;
}
