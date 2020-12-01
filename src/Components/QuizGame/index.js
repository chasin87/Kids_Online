import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { selectquizzes } from "../../Store/quizlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";
import { selectGebruiker } from "../../Store/gebruiker/selectors";
import { Button } from "@material-ui/core";
import "./index.css";

export default function QuizGameScreen() {
  const [lesson, setLesson] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { gebruikerToken } = useSelector(selectGebruiker);
  const history = useHistory();
  if (gebruikerToken === null) {
    history.push("/login");
  }

  let location = useLocation();
  let setter = location.state.filter;
  const dispatch = useDispatch();

  const Quizzes = useSelector(selectquizzes);
  const gebruiker = useSelector(selectGebruiker);
  const level = gebruiker.level;

  useEffect(() => {
    dispatch(fetchQuizList());
    setLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    setLesson(setter);
  }, [setter]);

  const filteredQuestions = Quizzes.filter((quiz) => {
    return loaded
      ? quiz.questionCategory.toLowerCase().includes(lesson.toLowerCase()) &&
          quiz.questionLevel.toString().includes(level.toString())
      : console.log("false");
  });

  console.log(filteredQuestions);

  return (
    <div className="main_Page_Quiz">
      <div className="inhoud_Quiz">
        <h2 className="lesson_h2">{lesson}</h2>
        <div className="rekenen">
          <Link className="linkLesson" to={`/${lesson}`}>
            <Button>Begin {lesson}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
