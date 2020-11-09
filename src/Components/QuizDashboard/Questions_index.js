import React, { useEffect } from "react";
import "./Question_index.css";
import { Card, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectquizzes } from "../../Store/quizlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";
import { Link } from "react-router-dom";
import { selectUser } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";
import Axios from "axios";

// import { questions } from "../Quiz";

export default function QuizQuestions() {
  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }
  const dispatch = useDispatch();
  const Quizzes = useSelector(selectquizzes);

  const delete_question = (id, e) => {
    Axios.delete(`http://localhost:8888/upload/${id}`).then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(fetchQuizList());
    });
  };

  useEffect(() => {
    dispatch(fetchQuizList());
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
                  fill-rule="evenodd"
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
                  fill-rule="evenodd"
                  d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="container_title">Quiz Questions</div>
        <div>
          {Quizzes.map((quest) => {
            return (
              <div className="question_part">
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
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
                        <div className="question_in_text_left">
                          <p>Question: {quest.question}</p>
                        </div>
                        <div className="question_in_text_right">
                          <div className="iconn">
                            <div className="iconArrow">
                              <svg
                                className="iconArr"
                                width="40px"
                                height="40px"
                                viewBox="0 0 16 16"
                                class="bi bi-arrow-down-square-fill"
                                fill="tomato"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                                />
                              </svg>
                            </div>
                            <div className="iconDelete">
                              <svg
                                width="40px"
                                height="40px"
                                viewBox="0 0 16 16"
                                class="bi bi-x"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={(e) => {
                                  delete_question(quest.id, e);
                                }}
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div className="headers_part">
                          <div className="question_headers">
                            Question details
                          </div>
                          <div className="question_info">{quest.question}</div>
                        </div>
                        <div className="headers_part">
                          <div className="question_headers">Question Image</div>
                          <img
                            className="question_image_format question_info"
                            src={quest.questionImage}
                            alt="questionImage"
                          />
                        </div>
                        <div className="headers_part">
                          <div className="question_headers">Question Sound</div>
                          <audio controls>
                            <source src={quest.questionSound}></source>
                          </audio>
                        </div>

                        <p>{quest.answer_b}</p>
                        <p>{quest.answer_c}</p>
                        <p>{quest.answer_d}</p>
                        <div className="edit_icons">
                          <svg
                            width="40px"
                            height="40px"
                            viewBox="0 0 16 16"
                            class="bi bi-pencil"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                            />
                          </svg>

                          <svg
                            width="40px"
                            height="40px"
                            viewBox="0 0 16 16"
                            class="bi bi-x"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={(e) => {
                              delete_question(quest.id, e);
                            }}
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
