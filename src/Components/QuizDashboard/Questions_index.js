import React, { useEffect, useState } from "react";
import "./Question_index.css";
import { Card, Accordion, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectquizzes } from "../../Store/quizlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";
import { selectanswers } from "../../Store/answerlist/selectors";
import { fetchAnswerList } from "../../Store/answerlist/actions";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { selectUser } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";

import Axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";

// import { questions } from "../Quiz";

export default function QuizQuestions() {
  const [show, setShow] = useState(false);
  const [ids, setIds] = useState();
  const [question, setQuestion] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState();

  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const Quizzes = useSelector(selectquizzes);
  const Answers = useSelector(selectanswers);

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
  }, [dispatch]);

  return (
    <div>
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
        {Quizzes.length < 1 ? (
          <Loading />
        ) : (
          <div>
            {Quizzes.map((quest) => {
              return (
                <div
                  className="question_part"
                  key={quest.id}
                  data-aos="fade-left"
                >
                  <Accordion defaultActiveKey="1">
                    <Card>
                      <Card.Header>
                        <div className="id">
                          {" "}
                          <p>Id: {quest.id}</p>
                        </div>
                        <div className="category">
                          <p> Category: {quest.questionCategory}</p>
                        </div>
                        <div className="level">
                          {" "}
                          <p>level: {quest.questionLevel}</p>
                        </div>
                        <div className="question_in_text">
                          <div className="question_in_text_left col-sm-12 col-md-9 col-lg-9">
                            <p>Question: {quest.question}</p>
                          </div>

                          <div className="question_in_text_right col-7 col-sm-5 col-md-3 col-lg-3  ">
                            <div className="iconn">
                              <Accordion.Toggle as={"iconArrow"} eventKey="0">
                                <div className="iconArrow">
                                  <svg
                                    width="30px"
                                    height="30px"
                                    viewBox="0 0 16 12"
                                    className="bi bi-caret-down-fill iconArr"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    href="#test"
                                  >
                                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                  </svg>
                                </div>
                              </Accordion.Toggle>
                            </div>
                          </div>
                        </div>
                        <Modal centered show={confirm}>
                          <Modal.Header className="header_modal">
                            <Modal.Title>Delete question</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to delete it?
                          </Modal.Body>
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
                      </Card.Header>

                      <Accordion.Toggle as={"iconArrow"} eventKey="0">
                        <Accordion.Collapse eventKey="0">
                          <Card.Body id="test">
                            <div className="headers_part" id="test">
                              <div className="head_card">
                                <div className="col-2"></div>
                                <img
                                  className="question_image_format question_info col-8"
                                  src={quest.questionImage}
                                  alt="questionImage"
                                />
                                <div className="iconDelete col-2 ">
                                  <svg
                                    width="40px"
                                    height="40px"
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
                              <div className="question_headers">
                                Question
                                <div className="question_info">
                                  {quest.question}
                                </div>
                              </div>

                              <AudioPlayer
                                header="Question Sound"
                                src={quest.questionSound}
                                showJumpControls={false}
                                customAdditionalControls={[]}
                                showDownloadProgress={false}
                                layout="horizontal"
                                customVolumeControls={[]}
                              />
                              <div className="question_footer">
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
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Accordion.Toggle>
                    </Card>
                  </Accordion>

                  <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header className="header_modal">
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
                                      <div className="answer_text">Answer</div>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
