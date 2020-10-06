import React from "react";
import "./Add_Question.css";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Add_Question() {
  return (
    <div className="container_quiz_dashboard">
      <div className="navigation_to_dashboard">
        <div className="back_to">
          <Link className="link_back" to="/QuizQuestions">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-caret-left"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"
              />
            </svg>
            Back to questions
          </Link>
        </div>
        <div className="next_to">
          <Link className="link_next" to="/QuizDashboard">
            Go to dashboard
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-caret-right"
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
      <div className="container_title">Add Questions</div>

      <div className="question_part">
        <Form.Group>
          <label>Question in text</label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter your question in text"
          />
          <Form.File id="exampleFormControlFile1" label="Question in Sound" />
          <hr />
          <label>Main image name</label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter Main image name in text"
          />
          <Form.File id="exampleFormControlFile1" label="Add Main Image" />
          <Form.File id="exampleFormControlFile1" label="Add Main Sound" />

          <hr />

          <label>1st Answer image name</label>
          <Form.Check type="checkbox" label="Correct answer" />
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter 1st Answer image name in text"
          />

          <Form.File id="exampleFormControlFile1" label="1st Answer Image" />
          <Form.File id="exampleFormControlFile1" label="1st Answer Sound" />
          <hr />
          <label>2nd Answer image name</label>
          <Form.Check type="checkbox" label="Correct answer" />
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter 2nd Answer image namein text"
          />
          <Form.File id="exampleFormControlFile1" label="2nd Answer Image" />
          <Form.File id="exampleFormControlFile1" label="2nd Answer Sound" />
          <hr />
          <label>3th Answer image name</label>
          <Form.Check type="checkbox" label="Correct answer" />
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter 3th Answer image name in text"
          />
          <Form.File id="exampleFormControlFile1" label="3th Answer Image" />
          <Form.File id="exampleFormControlFile1" label="3th Answer Sound" />
          <hr />
          <label>4th Answer image name</label>
          <Form.Check type="checkbox" label="Correct answer" />
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter 4th Answer image name in text"
          />
          <Form.File id="exampleFormControlFile1" label="4th Answer Image" />
          <Form.File id="exampleFormControlFile1" label="4th Answer Sound" />
          <hr />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </div>
    </div>
  );
}
