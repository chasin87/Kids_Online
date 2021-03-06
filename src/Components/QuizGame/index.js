import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Loading from "../Loading";

import { selectGebruiker } from "../../Store/gebruiker/selectors";
import { Button } from "@material-ui/core";
import "./index.css";

export default function QuizGameScreen() {
  const [lesson, setLesson] = useState([]);

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const { gebruikerToken } = useSelector(selectGebruiker);
  const history = useHistory();
  if (gebruikerToken === null) {
    history.push("/login");
  }

  let location = useLocation();
  let setter = location.state.filter;

  useEffect(() => {
    setLesson(setter);

    setTimeout(() => {
      setVisible(true);
      setLoading(false);
    }, 3000);
  }, [setter]);

  return (
    <div className="prev_Page_Quiz">
      <div className="prev_Quiz">
        <div className="prev_Content">
          {visible ? (
            <div className="rekenen">
              <Link
                className="linkLesson"
                to={{ pathname: `/QuizStart`, state: lesson }}
              >
                <Button className="begin_Lesson">Begin met {lesson}</Button>
              </Link>
            </div>
          ) : (
            <div>
              <h2 className="lesson_h2">{lesson}</h2>
              <div className="rekenen">
                <Loading />
                {loading}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
