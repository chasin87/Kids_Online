import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "./index.css";

import { selectGebruiker } from "../../Store/gebruiker/selectors";
import { selectquizzes } from "../../Store/quizlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";
import Loading from "../Loading";

export default function Quiz() {
  const Quizzes = useSelector(selectquizzes);
  const gebruiker = useSelector(selectGebruiker);
  const dispatch = useDispatch();
  const { gebruikerToken } = useSelector(selectGebruiker);

  const history = useHistory();

  if (gebruikerToken === null) {
    history.push("/login");
  }

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

  return (
    <div style={{ height: "90vh", backgroundColor: "#f8f9fabf" }}>
      <div className="quiz_Container">
        <div className="quiz_Category">
          <div className="quiz_Title">
            <h2 className="gebruikers_naam">Hi, {gebruiker.userName}</h2>
            <h2>Welkom bij de Quiz van Kids Online</h2>
            <h4>Kies een category om te spelen</h4>
          </div>
          {filteredCategory.length > 0 ? (
            <div className="quiz_single">
              {filteredCategory.map((filter) => {
                return (
                  <div className="catButtons" key={filter}>
                    <Link to={{ pathname: "/QuizGame", state: { filter } }}>
                      <button className="categoryButtons">{filter}</button>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}
