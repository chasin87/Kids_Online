import React, { useState } from "react";
import "./Add_Question.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { CustomInput, FormGroup, Input } from "reactstrap";
import { Form, Button } from "react-bootstrap";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import Axios from "axios";

export default function Add_Question() {
  const [question, setQuestion] = useState();
  const [images, setImages] = useState([]);
  const [imageUp, setImageUp] = useState(" ");
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [cat, setCat] = useState(null);
  const [level, setLevel] = useState(null);
  const [uploadedText, setUploadedText] = useState(false);

  const handleClose = () => {
    return [setShow(false)];
  };

  //quesion text and imageUrl post to Db
  const send = (event) => {
    console.log(question);
    console.log(imageUp);

    if (question === undefined || imageUp === " ") {
      return (
        setShow(true), alert("Please fill all questions and upload all files")
      );
    } else {
      const data = new FormData();
      data.append("question", question);
      data.append("questionImage", images);
      console.log("this is question", question);

      const options = {
        onUploadProgress: (progressEvent) => {
          setProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      };
      Axios.post("http://localhost:8888/upload", data, options)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      setTimeout(() => {
        setProgress(0);
        setImageUp(null);
        setQuestion();
        setShow(true);
        // alert("Upload completed");
      }, 1000);
    }
  };

  console.log("cat", cat);
  console.log("level", level);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImageUp(e.target.files[0]);
    }
  };

  // const test = () => {
  //   if (uploadedText) {
  //     return <p>`Image with file name ${imageUp.name} is uploaded`</p>;
  //   } else {
  //     return <p>"no file uplaoded yet.."</p>;
  //   }
  // };

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
        setUploadedText(true);
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
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header className="header_modal">
          <Modal.Title>Question Uploaded!</Modal.Title>
        </Modal.Header>
        <Modal.Body>All your text and files are uploaded</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="question_part">
        <div className="Form">
          <Form.Group>
            <label>Question in text</label>
            <Input
              type="email"
              name="email"
              id="question_main"
              placeholder="Enter your question in text"
            />

            <div className="imageUpload">
              {/* <input type="file" onChange={handleChange} /> */}
              <FormGroup>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser"
                  name="customFile"
                  label="Choose File...."
                  onChange={handleChange}
                />
              </FormGroup>
              <progress
                className="imageuplaod__progress"
                value={progress}
                max="100"
              />
              <div className="uploaded_text">
                {uploadedText ? (
                  <p>
                    image with file name
                    <span className="uploaded_file">{` ${imageUp.name} `}</span>
                    is uploaded.
                  </p>
                ) : (
                  <p></p>
                )}
              </div>

              <Button onClick={handleUpload} className="button_upload">
                Upload
              </Button>
            </div>

            <div className="row">
              <div className="dropdown_container col-sm-12 col-md-6 col-lg-6">
                <div class="input-group mb-3">
                  <select
                    class="custom-select"
                    id="inputGroupSelect02"
                    onChange={(event) => {
                      const { value } = event.target;
                      setCat(value);
                    }}
                  >
                    <option selected value=" ">
                      Category
                    </option>
                    <option value="Rijmen">Rijmen</option>
                    <option value="Rekenen">Rekenen</option>
                    <option value="Kleuren">Kleuren</option>
                  </select>
                  <div class="input-group-append">
                    <label class="input-group-text" for="inputGroupSelect02">
                      Options
                    </label>
                  </div>
                </div>
              </div>
              <div className="dropdown_container col-sm-12 col-md-6 col-lg-6">
                <div class="input-group mb-3">
                  <select
                    class="custom-select"
                    id="inputGroupSelect02"
                    onChange={(event) => {
                      const { value } = event.target;
                      setLevel(value);
                    }}
                  >
                    <option selected value=" ">
                      Level
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <div class="input-group-append">
                    <label class="input-group-text" for="inputGroupSelect02">
                      Options
                    </label>
                  </div>
                </div>
              </div>
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
              className="button_upload"
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
    </div>
  );
}
