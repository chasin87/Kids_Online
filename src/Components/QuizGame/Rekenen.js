import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGebruiker } from "../../Store/gebruiker/selectors";
import { useHistory } from "react-router-dom";

import { selectquizzes } from "../../Store/quizlist/selectors";
import { selectanswers } from "../../Store/answerlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";
import { fetchAnswerList } from "../../Store/answerlist/actions";

import Loading from "../Loading";

import useSound from "use-sound";
import Button from "@material-ui/core/Button";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

import "./index.css";

export default function Rekenen() {
  const { gebruikerToken } = useSelector(selectGebruiker);
  const history = useHistory();
  if (gebruikerToken === null) {
    history.push("/login");
  }

  const [lesson, setLesson] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sound, setSound] = useState();
  const [loading, setLoading] = useState(true);

  const Quizzes = useSelector(selectquizzes);
  const Answers = useSelector(selectanswers);
  const gebruiker = useSelector(selectGebruiker);
  const level = gebruiker.level;

  let location = useLocation();

  let setter = location.state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizList());
    dispatch(fetchAnswerList());
    setLesson(setter);
    setLoaded(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [dispatch, setter]);

  const filteredQuestions = Quizzes.filter((quiz) => {
    return loaded
      ? quiz.questionCategory.toLowerCase().includes(lesson.toLowerCase()) &&
          quiz.questionLevel.toString().includes(level.toString())
      : null;
  });

  // console.log(filteredQuestions[0]);
  // console.log(Answers);

  useEffect(() => {
    filteredQuestions.map((filt) => {
      setSound(filt.questionSound);
    });
  }, [filteredQuestions]);

  const [play] = useSound(sound);
  const [plays] = useSound(sound);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="main_Page_Quiz">
      <div className="inhoud_Quiz">
        <div className={"quiz_Elements"}>
          <div className="question_Image">
            <img
              src={filteredQuestions[0].questionImage}
              alt="question Image"
            />
            <div
              className="question_Image_sound"
              onClick={() => {
                play();
              }}
            >
              <Button className="button_Sound">
                <VolumeUpIcon />
              </Button>
            </div>
            <div className="row">
              {Answers.map((ans) => {
                if (ans.quizId === filteredQuestions[0].id) {
                  return (
                    <div className="quiz_answer col-6">
                      <div>
                        <div className="answer_Image ">
                          <img src={ans.answerImage} alt="answer Image" />
                        </div>
                        <div
                          className="answer_Image_sound"
                          onClick={() => {
                            plays();
                          }}
                        >
                          <Button className="button_Sound">
                            <VolumeUpIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
