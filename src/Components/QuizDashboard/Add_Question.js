import React, { useState } from "react";
import "./Add_Question.css";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import Axios from "axios";

export default function Add_Question() {
  const [question, setQuestion] = useState();
  const [images, setImages] = useState([]);
  const [imageUp, setImageUp] = useState(null);
  const [progress, setProgress] = useState(0);

  //quesion text and imageUrl post to Db
  const send = (event) => {
    const data = new FormData();
    data.append("question", question);
    data.append("questionImage", images);
    console.log("this is question", question);

    Axios.post("http://localhost:8888/upload", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImageUp(e.target.files[0]);
    }
  };

  //image upload to firebase
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${imageUp.name}`).put(imageUp);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //ERROR fucntion..
        console.log(error);
        alert(error.message);
      },

      () => {
        //complete function...
        storage
          .ref("images")
          .child(imageUp.name)
          .getDownloadURL()
          .then((url) => {
            setImages(url);
            //post image inside db....
            db.collection("images").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
            });
            setProgress(0);
            setImageUp(null);
          });
      }
    );
  };

  return (
    <div className="container_quiz_dashboard">
      <div className="navigation_to_dashboard">
        <div className="back_to">
          <Link className="link_back" to="/QuizQuestions">
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
      <div className="container_title">Add Questions</div>

      <div className="question_part">
        <Form.Group>
          <label>Question in text</label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter your question in text"
            onChange={(event) => {
              const { value } = event.target;
              setQuestion(value);
            }}
          />
          <div className="imageUpload">
            <progress
              className="imageuplaod__progress"
              value={progress}
              max="100"
            />

            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
          </div>

          {/* <input
            type="file"
            id="file"
            accept=".png"
            onChange={(event) => {
              const file = event.target.files[0];
              setQuestionImage(file);
            }}
          /> */}

          {/* <Form.File id="exampleFormControlFile1" type="file" label="Question in Sound" onChange={event => {
            const file = event.target.files[0]
            setQuestionSound(file)
          }}/> */}
          <hr />
          {/* <label>Main image name</label>
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
          <hr /> */}
          <Button
            variant="primary"
            onClick={() => {
              send();
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </div>
    </div>
  );
}
