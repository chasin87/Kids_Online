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
import RekenenVraag from "../../Sounds/Rekenen.mp3";
import EntranceSound from "../../Sounds/EntranceSound.mp3";
import CorrectAnswer from "../../Sounds/CorrectAnswer.mp3";
import FalseAnswer from "../../Sounds/FalseAnswer.mp3";

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

  const [playRekenen] = useSound(RekenenVraag, { volume: 0.9 });
  const [playEntranceSound] = useSound(EntranceSound, { volume: 0.7 });
  const [playCorrectSound] = useSound(CorrectAnswer, { volume: 0.9 });
  const [playFalseSound] = useSound(FalseAnswer, { volume: 0.9 });

  const [lesson, setLesson] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(false);
  const [classer, setClasser] = useState(null);
  const [classerFalse, setClasserFalse] = useState(null);

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
      playEntranceSound();
    }, 3000);
  }, [dispatch, setter, playEntranceSound]);

  useEffect(() => {
    setTimeout(() => {
      playRekenen();
    }, 7000);
  }, [playRekenen]);

  const filteredQuestions = Quizzes.filter((quiz) => {
    return quiz.questionComplete
      ? loaded
        ? quiz.questionCategory.toLowerCase().includes(lesson.toLowerCase()) &&
          quiz.questionLevel.toString().includes(level.toString())
        : null
      : null;
  });

  const handleAnswerButton = (isCorrect, index) => {
    if (Answers[index].isCorrect) {
      setClasser(index);
      playCorrectSound();
      setVisible(true);
      setScore(score + 1);
    } else {
      setClasserFalse(index);
      playFalseSound();
      setVisible(true);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < filteredQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setVisible(false);
      setClasser("answer_Image");
      setClasserFalse("answer_Image");
    } else {
      setShowScore(true);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <Loading />
      </div>
    );
  }

  return (
    <div className="main_Page_Quiz">
      {showScore ? (
        <div>
          <h2>SHOW SCORE</h2>
          <h2>
            Je hebt {score} van de {filteredQuestions.length} goed.
          </h2>
        </div>
      ) : (
        <div className="inhoud_Quiz">
          <div className={"quiz_Elements"}>
            <div className="question_Image">
              <div className="question">
                <img
                  src={filteredQuestions[currentQuestion].questionImage}
                  alt="question_Image"
                />
                <div>
                  <h5>{filteredQuestions[currentQuestion].question}</h5>
                </div>
                <div
                  className="question_Image_sound"
                  onClick={() => {
                    playRekenen();
                  }}
                >
                  <Button className="button_Sound">
                    <VolumeUpIcon />
                  </Button>
                </div>
              </div>
              <div className="row">
                {Answers.map((ans, index) => {
                  if (ans.quizId === filteredQuestions[currentQuestion].id) {
                    return (
                      <div className="question_answer col-6">
                        <div className="quiz_answer col-12">
                          <div className="displayer">
                            <div>
                              <img
                                key={index}
                                className={`answer_Image ${
                                  classer === index
                                    ? "answer_Image_Correct"
                                    : classerFalse === index
                                    ? "answer_Image_False"
                                    : "answer_Image"
                                }`}
                                src={ans.answerImage}
                                alt={"answer_Image"}
                                onClick={() => {
                                  handleAnswerButton(ans.isCorrect, index);
                                }}
                              />
                            </div>

                            <div
                              className="answer_Image_sound"
                              onClick={() => {
                                "plays();";
                              }}
                            >
                              <Button className="button_Sound">
                                <VolumeUpIcon />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            {visible ? (
              <Button
                className="next_question"
                onClick={() => {
                  handleNextQuestion();
                }}
              >
                Volgende vraag
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
