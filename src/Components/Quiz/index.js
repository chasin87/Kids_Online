import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.css";

import { selectGebruiker } from "../../Store/gebruiker/selectors";
import { selectquizzes } from "../../Store/quizlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";
import { Button } from "react-bootstrap";

export default function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const Quizzes = useSelector(selectquizzes);
  const { userName, email, level } = useSelector(selectGebruiker);

  const dispatch = useDispatch();

  const { gebruikerToken } = useSelector(selectGebruiker);
  const history = useHistory();
  console.log(gebruikerToken);
  if (gebruikerToken === null) {
    history.push("/login");
  }

  console.log(userName, email, level);

  useEffect(() => {
    dispatch(fetchQuizList());
  }, [dispatch]);

  //Take all the categorys
  const category = Quizzes.map((quiz) => {
    return quiz.questionCategory;
  });

  //filter all the categorys
  const filteredCategory = category.filter(
    (item, index) => category.indexOf(item) === index
  );

  console.log(quiz);

  return (
    <div className="quiz_Container">
      <div className="quiz_Category">
        <div className="quiz_Title">
          <h2>Welkom bij de Quiz van Kids Online</h2>
        </div>
        <div className="quiz_single">
          {filteredCategory.map((filter) => {
            return (
              <div className="catButs" key={filter}>
                <Button className="cat" onClick={(e) => setQuiz(filter)}>
                  {filter}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
