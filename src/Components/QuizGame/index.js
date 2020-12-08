import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { selectGebruiker } from "../../Store/gebruiker/selectors";
import { Button } from "@material-ui/core";
import "./index.css";

export default function QuizGameScreen() {
  const [lesson, setLesson] = useState([]);

  const { gebruikerToken } = useSelector(selectGebruiker);
  const history = useHistory();
  if (gebruikerToken === null) {
    history.push("/login");
  }

  let location = useLocation();
  let setter = location.state.filter;

  useEffect(() => {
    setLesson(setter);
  }, [setter]);

  return (
    <div className="main_Page_Quiz">
      <div className="inhoud_Quiz">
        <div className="quiz_content">
          <h2 className="lesson_h2">{lesson}</h2>
          <div className="rekenen">
            <Link
              className="linkLesson"
              to={{ pathname: `/QuizStart`, state: lesson }}
            >
              <Button className="begin_Lesson">Begin {lesson}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
