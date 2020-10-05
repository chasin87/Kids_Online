import React from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
// import { bi-arrow-down-square-fill } from "react-bootstrap-icons";

import { useSelector } from "react-redux";
import { selectUser } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";
import { questions } from "../Quiz";

export default function QuizDashboard() {
  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }

  return (
    <div>
      <p className="title">QUIZ DASHBOARD</p>
      <div className="container_quiz_dashboard">
        <div className="container_title">Quiz Questions</div>
        <div>
          {questions.map((quest) => {
            return (
              <div className="question_part">
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <div className="id"> Id: {quest.question_id}</div>
                      <div className="category">
                        Category: {quest.question_category}
                      </div>
                      <div className="question_in_text">
                        Question: {quest.question_text}
                      </div>
                      <svg
                        className="iconArr"
                        width="61px"
                        height="61px"
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
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>Hello! I'm the body</Card.Body>
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
