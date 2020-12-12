import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import "./Question_index.css";

import Loading from "../Loading";

import { Button, Modal, Badge } from "react-bootstrap";

import { selectUser } from "../../Store/user/selectors";
import { selectquizzes } from "../../Store/quizlist/selectors";
import { selectanswers } from "../../Store/answerlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";
import { fetchAnswerList } from "../../Store/answerlist/actions";
import { fetchAnswerQuantity } from "../../Store/quantity/actions";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function QuizQuestions() {
  const [show, setShow] = useState(false);
  const [ids, setIds] = useState();
  const [question, setQuestion] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [cat, setCat] = useState("");
  const [level, setLevel] = useState("");
  const [questStatus, setQuestStatus] = useState("");
  const [sortUp, setSortUp] = useState(true);

  const { token } = useSelector(selectUser);
  const history = useHistory();

  if (token === null) {
    history.push("/");
  }

  const Quizzes = useSelector(selectquizzes);
  const Answers = useSelector(selectanswers);
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    if (cat === "All") {
      setCat("");
    } else if (level === "All") {
      setLevel("");
    } else if (questStatus === "All") {
      setQuestStatus("");
    }
  }, [cat, level, questStatus]);

  useEffect(() => {
    dispatch(fetchQuizList());
    dispatch(fetchAnswerList());
    dispatch(fetchAnswerQuantity());
  }, [dispatch]);

  const filteredQuestions = Quizzes.filter((quiz) => {
    return (
      quiz.questionCategory.toLowerCase().includes(cat.toLowerCase()) &&
      quiz.questionLevel.toString().includes(level.toString()) &&
      quiz.questionComplete.toString().includes(questStatus)
    );
  });

  const sorted = filteredQuestions.sort((a, b) => {
    if (sortUp === true) {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  const delete_confirm = (id, e) => {
    setConfirm(true);
    setIdToDelete(id);
  };

  const showAnswers = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setIds();
  };

  const delete_question = () => {
    Axios.delete(`https://kids-online.herokuapp.com/upload/${idToDelete}`).then(
      (res) => {
        console.log(res);
        console.log(res.data);
        dispatch(fetchQuizList());
      }
    );
    Axios.delete(`https://kids-online.herokuapp.com/answer/${idToDelete}`).then(
      (res) => {
        console.log(res);
        console.log(res.data);
        dispatch(fetchAnswerList());
      }
    );
    setConfirm(false);
  };

  return (
    <div className="rowws">
      <div className="container_quiz_dashboard">
        <div className="navigation_to_dashboard">
          <div className="back_to">
            <Link className="link_back" to="/QuizDashboard">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-caret-left"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"
                />
              </svg>
              Terug naar dashboard
            </Link>
          </div>
          <div className="next_to">
            <Link className="link_next" to="/Add_Question">
              Nieuwe vraag toevoegen
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-caret-right"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="container_title">Quiz Vragen</div>

        <div
          className="row"
          style={{ margin: "auto", marginTop: "30px", width: "96%" }}
        >
          <div className="dropdown_container col-sm-12 col-md-4 col-lg-4">
            <div>
              {" "}
              <label>Vraag Categorie</label>
            </div>

            <div className="input-group mb-3">
              <select
                className="custom-select"
                id="inputGroupSelect02"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              >
                <option defaultValue="">All</option>
                <option value="Rijmen">Rijmen</option>
                <option value="Rekenen">Rekenen</option>
                <option value="Kleuren">Kleuren</option>
              </select>
              <div className="input-group-append"></div>
            </div>
          </div>
          <div className="dropdown_container col-sm-12 col-md-4 col-lg-4">
            <div>
              {" "}
              <label>Vraag Level</label>
            </div>
            <div className="input-group mb-3">
              <select
                className="custom-select"
                id="inputGroupSelect02"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option defaultValue="">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <div className="input-group-append"></div>
            </div>
          </div>
          <div className="dropdown_container col-sm-12 col-md-4 col-lg-4">
            <div>
              {" "}
              <label>Vraag Status</label>
            </div>
            <div className="input-group mb-3">
              <select
                className="custom-select"
                id="inputGroupSelect02"
                value={questStatus}
                onChange={(e) => setQuestStatus(e.target.value)}
              >
                <option defaultValue="">All</option>
                <option value="true">Vragen Compleet</option>
                <option value="false">Vragen Niet Compleet</option>
              </select>
              <div className="input-group-append"></div>
            </div>
          </div>
        </div>
        <div className="row2" style={{ margin: "auto", marginTop: "30px" }}>
          <div className=" col-sm-12 col-md-12 col-lg-3"></div>
          <div className="sort_Up col-sm-12 col-md-12 col-lg-3">
            <Button
              className="setSortUp shadow-none"
              onClick={() => setSortUp(true)}
            >
              ⬆ Sorteer op eerste ID
            </Button>
          </div>
          <div className="sort_Down col-sm-12 col-md-12 col-lg-3 ">
            <Button
              className="setSortUp shadow-none"
              onClick={() => setSortUp(false)}
            >
              ⬇ Sorteer op laatste ID
            </Button>
          </div>{" "}
          <div className=" col-sm-12 col-md-12 col-lg-3"></div>
        </div>
        {Quizzes.length < 1 ? (
          <Loading />
        ) : (
          <div
            className="row"
            style={{ margin: "auto", marginTop: "50px", width: "96%" }}
          >
            {sorted.map((quest, sort, index) => {
              return (
                <div className="col-sm-12 col-md-6 col-xl-4" key={quest.id}>
                  <div className="card">
                    <div className="head_card">
                      <div className="head_card_top">
                        <div className="iconDelete">
                          <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 16 16"
                            className="bi bi-x"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={(e) => {
                              delete_confirm(quest.id, e);
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="head_card_below">
                        <div className="left-image col-4"></div>

                        <img
                          className="card-img-top"
                          src={quest.questionImage}
                          alt="Image_answer"
                        />
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{quest.question}</p>
                      <h5 className="card-title category">
                        {quest.questionCategory}
                      </h5>
                      <div className="level_id">
                        <h5 className="card-title level">
                          Level: {quest.questionLevel}
                        </h5>
                        <h5 className="card-title id">Id: {quest.id}</h5>
                      </div>
                      <h5 className="complete_question">
                        <div>
                          {quest.questionComplete ? (
                            <Badge variant="success">Vraag Compleet</Badge>
                          ) : (
                            <Link to="/answers">
                              <Badge
                                variant="danger"
                                onClick={(e) => {
                                  console.log(
                                    "missing answers",
                                    quest.id,
                                    quest.question
                                  );
                                }}
                              >
                                Ontbrekende antwoorden
                              </Badge>
                            </Link>
                          )}
                        </div>
                      </h5>

                      <AudioPlayer
                        header="Vraag Audio"
                        src={quest.questionSound}
                        showJumpControls={false}
                        customAdditionalControls={[]}
                        showDownloadProgress={false}
                        layout="horizontal"
                        customVolumeControls={[]}
                        autoPlay={false}
                      />
                      <Button
                        className="answer_button"
                        onClick={() => {
                          showAnswers(quest.id);
                          setIds(quest.id);
                          setQuestion(quest.question);
                        }}
                      >
                        Antwoorden
                      </Button>
                    </div>

                    <div>
                      {ids === quest.id ? (
                        <Modal centered show={show} onHide={handleClose}>
                          <Modal.Header className="header_modal_answer">
                            <Modal.Title>
                              Antwoorden voor
                              <br />
                              {question}
                            </Modal.Title>
                          </Modal.Header>
                          {Answers.length < 1 ? (
                            <Loading />
                          ) : (
                            <div>
                              {Answers.map((answer, index) => {
                                if (ids === answer.quizId) {
                                  return (
                                    <Modal.Body>
                                      <div key={answer.id}>
                                        <div className="row">
                                          <div className="answer_image col-sm-6">
                                            <img
                                              className="question_image_answer question_info"
                                              src={answer.answerImage}
                                              alt="answerImage"
                                            />
                                          </div>
                                          <div className=" col-sm-6">
                                            <div className="answer_id">
                                              ID: {answer.id}
                                            </div>
                                            <div className="answer_text">
                                              Antwoord
                                            </div>
                                            <div className="answer_text_value">
                                              {answer.answer}
                                            </div>
                                            <div className="correct_box">
                                              <div className="answer_isCorrect">
                                                Correct
                                              </div>
                                              {answer.isCorrect ? (
                                                <div className="answer_isCorrect_value_correct">
                                                  {answer.isCorrect === true
                                                    ? "Goed"
                                                    : null}
                                                </div>
                                              ) : (
                                                <div className="answer_isCorrect_value_false">
                                                  {answer.isCorrect === false
                                                    ? "Fout"
                                                    : null}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <AudioPlayer
                                          header="Antwoord Audio"
                                          src={answer.answerSound}
                                          showJumpControls={false}
                                          customAdditionalControls={[]}
                                          showDownloadProgress={false}
                                          layout="horizontal"
                                          customVolumeControls={[]}
                                        />
                                      </div>
                                    </Modal.Body>
                                  );
                                } else {
                                  return false;
                                }
                              })}
                            </div>
                          )}
                          <Modal.Footer>
                            {" "}
                            <Button variant="secondary" onClick={handleClose}>
                              Sluiten
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      ) : null}
                    </div>
                  </div>
                  <Modal centered show={confirm}>
                    <Modal.Header className="header_modal_answer">
                      <Modal.Title>Vraag verwijderen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Weet u zeker dat u het wilt verwijderen?
                    </Modal.Body>
                    <Modal.Footer>
                      <div id="delete_Buttons_Modal">
                        <Button
                          variant="secondary"
                          onClick={(e) => {
                            delete_question(quest.id, e);
                          }}
                        >
                          Ja
                        </Button>
                      </div>
                      <div id="delete_Buttons_Modal">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setConfirm(false);
                          }}
                        >
                          Nee
                        </Button>
                      </div>
                    </Modal.Footer>
                  </Modal>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
