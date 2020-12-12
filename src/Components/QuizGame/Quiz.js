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

import CorrectAnswer from "../../Sounds/CorrectAnswer.mp3";
import FalseAnswer from "../../Sounds/FalseAnswer.mp3";

import useSound from "use-sound";

//UI imports
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

import ShowScore from "../../Components/Showscore";

import "./index.css";

export default function Quiz() {
  const { gebruikerToken } = useSelector(selectGebruiker);
  const history = useHistory();
  if (gebruikerToken === null) {
    history.push("/login");
  }

  const [playCorrectSound] = useSound(CorrectAnswer, { volume: 0.03 });
  const [playFalseSound] = useSound(FalseAnswer, { volume: 0.03 });

  const [lesson, setLesson] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(false);
  const [classer, setClasser] = useState(null);
  const [classerFalse, setClasserFalse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [nextProgress, setNextProgress] = useState(1);
  const [visibleLast, setVisibleLast] = useState(false);
  const [answerGiven, setAnserwerGiven] = useState(false);

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
  }, [dispatch, setter]);

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

      setScore(score + 1);
      setNextProgress(nextProgress + 1);
      const progress = Math.round(
        (nextProgress / filteredQuestions.length) * 100
      );
      setProgress(progress);
      setAnserwerGiven(true);
      if (nextProgress === filteredQuestions.length) {
        setVisibleLast(true);
      } else {
        setVisible(true);
      }
    } else {
      setClasserFalse(index);
      playFalseSound();
      setNextProgress(nextProgress + 1);
      const progress = Math.round(
        (nextProgress / filteredQuestions.length) * 100
      );
      setProgress(progress);
      setAnserwerGiven(true);
      if (nextProgress === filteredQuestions.length) {
        setVisibleLast(true);
      } else {
        setVisible(true);
      }
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < filteredQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setVisible(false);
      setClasser("answer_Image");
      setClasserFalse("answer_Image");
      setAnserwerGiven(false);
    } else {
      setShowScore(true);
    }
  };

  //Question Button Sound
  const playRekenen = (i) => {
    filteredQuestions.map((filt) => {
      if (i === filt.id) {
        let audioTune = new Audio(filt.questionSound);
        audioTune.play();
      }
      return null;
    });
  };

  //Answer Button Sound
  const player = (index) => {
    let audioTune = new Audio(Answers[index].answerSound);
    audioTune.play();
  };

  return (
    <div>
      {Answers.length > 0 && filteredQuestions.length > 0 ? (
        <div className="main_Page_Quiz">
          {showScore ? (
            <ShowScore
              score={score}
              filteredQuestionsLength={filteredQuestions.length}
              gebruiker={gebruiker.userName.toUpperCase()}
            />
          ) : (
            <div className="inhoud_Quiz">
              <div className="score_Bar">
                <div className="gebruikerNaam">
                  <span style={{ fontWeight: "400" }}>Gebruikersnaam: </span>{" "}
                  {gebruiker.userName.toUpperCase()}
                </div>
                <div className="progressBar">
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                  ></LinearProgress>
                </div>
              </div>
              <div className="header_Quiz">
                <div className="col-sm-12 col-md-12 col-lg-12 question_Card">
                  <img
                    className="quest_image"
                    src={filteredQuestions[currentQuestion].questionImage}
                    alt="question_Image"
                  />
                  <h5>{filteredQuestions[currentQuestion].question}</h5>
                  <div
                    key={filteredQuestions[currentQuestion].id}
                    className="question_Image_sound"
                    onClick={() => {
                      playRekenen(filteredQuestions[currentQuestion].id);
                    }}
                  >
                    <VolumeUpIcon />
                  </div>
                </div>
              </div>
              {answerGiven ? (
                <div
                  className="row answers_Quiz"
                  style={{ justifyContent: "space-evenly" }}
                >
                  {Answers.map((ans, index) => {
                    if (ans.quizId === filteredQuestions[currentQuestion].id) {
                      return (
                        <div
                          className="col-sm-12 col-md-5 col-lg-5 answer"
                          key={index}
                          // style={{ width: "90%" }}
                        >
                          <img
                            className={`answer_Image ${
                              classer === index
                                ? "answer_Image_Correct"
                                : classerFalse === index
                                ? "answer_Image_False"
                                : "answer_Image"
                            }`}
                            src={ans.answerImage}
                            alt={"answer_Image"}
                          />

                          <div
                            key={index}
                            className="answer_Image_sound"
                            onClick={() => {
                              player(index);
                            }}
                          >
                            <VolumeUpIcon />
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : (
                <div
                  className="row answers_Quiz"
                  style={{ justifyContent: "space-evenly" }}
                >
                  {Answers.map((ans, index) => {
                    if (ans.quizId === filteredQuestions[currentQuestion].id) {
                      return (
                        <div
                          className="col-sm-12 col-md-5 col-lg-5 answer"
                          key={index}
                          // style={{ width: "90%" }}
                        >
                          <img
                            // key={index}
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

                          <div
                            key={index}
                            className="answer_Image_sound"
                            onClick={() => {
                              player(index);
                            }}
                          >
                            <VolumeUpIcon />
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              <div className="footer_Quiz" style={{ margin: "20px" }}>
                {visibleLast ? (
                  <Button
                    className="next_question"
                    onClick={() => {
                      handleNextQuestion();
                    }}
                    style={{ marginBottom: "20px" }}
                  >
                    Einde
                  </Button>
                ) : visible ? (
                  <Button
                    className="next_question"
                    onClick={() => {
                      handleNextQuestion();
                    }}
                    style={{ marginBottom: "20px" }}
                  >
                    Volgende vraag
                  </Button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
