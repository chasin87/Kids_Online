import React, { useEffect, useState } from "react";
import "./Question_index.css";
import { Button, Modal, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectquizzes } from "../../Store/quizlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";
import { selectanswers } from "../../Store/answerlist/selectors";
import { fetchAnswerList } from "../../Store/answerlist/actions";
import { fetchAnswerQuantity } from "../../Store/quantity/actions";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { selectUser } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";

import Axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function QuizQuestions() {
  const Quizzes = useSelector(selectquizzes);
  const Answers = useSelector(selectanswers);
  const [show, setShow] = useState(false);
  const [ids, setIds] = useState();
  const [question, setQuestion] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [cat, setCat] = useState("");
  const [level, setLevel] = useState("");
  const [questStatus, setQuestStatus] = useState("");
  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const filteredQuestions = Quizzes.filter((quiz) => {
    return (
      quiz.questionCategory.toLowerCase().includes(cat.toLowerCase()) &&
      quiz.questionLevel.toString().includes(level.toString()) &&
      quiz.questionComplete.toString().includes(questStatus)
    );
  });

  // console.log(
  //   Quizzes.map((quiz) => {
  //     return quiz.questionComplete;
  //   })
  // );

  useEffect(() => {
    if (cat === "All") {
      setCat("");
    } else if (level === "All") {
      setLevel("");
    } else if (questStatus === "All") {
      setQuestStatus("");
    }
  }, [cat, level, questStatus]);

  const delete_confirm = (id, e) => {
    setConfirm(true);
    setIdToDelete(id);
  };

  const delete_question = () => {
    Axios.delete(`http://localhost:8888/upload/${idToDelete}`).then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(fetchQuizList());
    });
    Axios.delete(`http://localhost:8888/answer/${idToDelete}`).then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(fetchAnswerList());
    });
    setConfirm(false);
  };
  const showAnswers = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setIds();
  };
  useEffect(() => {
    dispatch(fetchQuizList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAnswerList());
    dispatch(fetchAnswerQuantity());
  }, [dispatch]);

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
              Back to dashboard
            </Link>
          </div>
          <div className="next_to">
            <Link className="link_next" to="/Add_Question">
              Go to Add Question
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

        <div className="container_title">Quiz Questions</div>

        <div
          className="row"
          style={{ margin: "auto", marginTop: "30px", width: "96%" }}
        >
          <div className="dropdown_container col-sm-12 col-md-4 col-lg-4">
            <div>
              {" "}
              <label>Question Category</label>
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
              <div className="input-group-append">
                {/* <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect02"
                >
                  Category
                </label> */}
              </div>
            </div>
          </div>
          <div className="dropdown_container col-sm-12 col-md-4 col-lg-4">
            <div>
              {" "}
              <label>Question Level</label>
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
              <div className="input-group-append">
                {/* <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect02"
                >
                  Level
                </label> */}
              </div>
            </div>
          </div>
          <div className="dropdown_container col-sm-12 col-md-4 col-lg-4">
            <div>
              {" "}
              <label>Question Status</label>
            </div>
            <div className="input-group mb-3">
              <select
                className="custom-select"
                id="inputGroupSelect02"
                value={questStatus}
                onChange={(e) => setQuestStatus(e.target.value)}
              >
                <option defaultValue="">All</option>
                <option value="true">Questions Completed</option>
                <option value="false">Questions Not Completed</option>
              </select>
              <div className="input-group-append">
                {/* <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect02"
                >
                  Level
                </label> */}
              </div>
            </div>
          </div>
        </div>
        {Quizzes.length < 1 ? (
          <Loading />
        ) : (
          <div
            className="row"
            style={{ margin: "auto", marginTop: "50px", width: "96%" }}
          >
            {filteredQuestions.map((quest) => {
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
                            <Badge variant="success">Question Complete</Badge>
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
                                Missing Answers
                              </Badge>
                            </Link>
                          )}
                        </div>
                      </h5>

                      <AudioPlayer
                        header="Question Sound"
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
                        // onClick={showAnswers}
                        onClick={(id, question) => {
                          showAnswers();
                          setIds(quest.id);
                          setQuestion(quest.question);
                        }}
                      >
                        Answers
                      </Button>
                    </div>

                    <div>
                      <Modal centered show={show} onHide={handleClose}>
                        <Modal.Header className="header_modal_answer">
                          <Modal.Title>
                            Answers for
                            <br />
                            {question}
                          </Modal.Title>
                        </Modal.Header>
                        {Answers.length < 1 ? (
                          <Loading />
                        ) : (
                          <div>
                            {Answers.map((answer) => {
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
                                            Answer
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
                                                {answer.isCorrect.toString()}
                                              </div>
                                            ) : (
                                              <div className="answer_isCorrect_value_false">
                                                {answer.isCorrect.toString()}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <AudioPlayer
                                        header="Question Sound"
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
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                  <Modal centered show={confirm}>
                    <Modal.Header className="header_modal_answer">
                      <Modal.Title>Delete question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete it?</Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={(e) => {
                          delete_question(quest.id, e);
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setConfirm(false);
                        }}
                      >
                        No
                      </Button>
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
