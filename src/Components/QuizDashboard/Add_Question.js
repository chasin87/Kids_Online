import React, { useState } from "react";
import "./Add_Question.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { CustomInput, FormGroup, Input } from "reactstrap";
import { Form, Button } from "react-bootstrap";
import { storage, db } from "../../firebase";

import LinearProgress from "@material-ui/core/LinearProgress";
import firebase from "firebase";
import Axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";

// import Answers from "./Answers";

export default function Add_Question() {
  const [question, setQuestion] = useState("");
  const [images, setImages] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [imageUp, setImageUp] = useState([]);
  const [soundUp, setSoundUp] = useState([]);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [cat, setCat] = useState("");
  const [level, setLevel] = useState(" ");
  const [uploadedText, setUploadedText] = useState(false);
  const [uploadedTextSound, setUploadedTextSound] = useState(false);

  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }
  const status = false;

  const inputChange = (event) => {
    setQuestion(event.target.value);
  };

  const catChange = (event) => {
    setCat(event.target.value);
  };

  const levelChange = (event) => {
    setLevel(event.target.value);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImageUp(e.target.files[0]);
    }
  };
  const handleChangeSound = (e) => {
    if (e.target.files[0]) {
      setSoundUp(e.target.files[0]);
    }
  };
  console.log(imageUp);
  //quesion text and imageUrl post to Db
  const send = (event) => {
    console.log("this is", event);
    if (question === "" || imageUp === " " || cat === "" || level === null) {
      return alert("Please fill all questions and upload all files");
    } else {
      if (images.length === 0 || sounds.length === 0) {
        return alert("Please upload all files");
      } else {
        // const progress = Math.round((100 * event.loaded) / event.total);
        // setProgress(progress);
        const data = new FormData();
        data.append("question", question);
        data.append("questionImage", images);
        data.append("questionSound", sounds);
        data.append("questionCategory", cat);
        data.append("questionLevel", level);
        data.append("questionComplete", status);

        Axios.post("http://localhost:8888/upload", data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        setShow(true);
      }
    }
  };

  //image upload to firebase
  const handleUpload = () => {
    if (imageUp.length === 0) {
      alert("Please choose a image file...");
    } else {
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
              handleUploadSound();
              setProgress(0);
            });
        }
      );
    }
  };

  //sound upload to firebase
  const handleUploadSound = () => {
    if (soundUp.length === 0) {
      alert("Please choose a sound file...");
    } else {
      const uploadTask = storage.ref(`sounds/${soundUp.name}`).put(soundUp);
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
          setUploadedTextSound(true);
          //complete function...
          storage
            .ref("sounds")
            .child(soundUp.name)
            .getDownloadURL()
            .then((url) => {
              setSounds(url);
              //post image inside db....
              db.collection("sounds").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                soundUrl: url,
              });

              setProgress(0);
            });
        }
      );
    }
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
      <Modal centered show={show}>
        <Modal.Header className="header_modal">
          <Modal.Title>Question Uploaded!</Modal.Title>
        </Modal.Header>
        <Modal.Body>All your text and files are uploaded</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            <Link to="/answers">Go to add Answers</Link>
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="question_part">
        <div className="Form">
          <Form.Group>
            <label>Question in text</label>
            <Input
              type="text"
              name="text"
              id="question_main"
              placeholder="Enter your question in text"
              onChange={inputChange}
              value={question}
            />

            {/* ImageUpload */}
            <div className="row">
              <div className="imageUpload col-sm-12 col-md-6 col-lg-6">
                <FormGroup>
                  <label>Question Image</label>
                  <CustomInput
                    type="file"
                    id="exampleCustomFileBrowser"
                    name="customFile"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleChange}
                  />
                </FormGroup>
                {/* ----- */}
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

                {/* <Button onClick={handleUpload} className="button_upload">
                Upload
              </Button> */}
              </div>

              {/* SoundUpload */}
              <div className="soundUpload col-sm-12 col-md-6 col-lg-6">
                <FormGroup>
                  <label>Question Sound</label>
                  <CustomInput
                    type="file"
                    id="exampleCustomFileBrowser"
                    name="customFile"
                    label="Choose sound file..."
                    accept=".m4a, .mp3"
                    onChange={handleChangeSound}
                  />
                </FormGroup>
                {/* <progress
                className="imageuplaod__progress"
                value={progressSound}
                max="100"
                
              /> */}

                <div className="uploaded_text">
                  {uploadedTextSound ? (
                    <p>
                      sound with file name
                      <span className="uploaded_file">{` ${soundUp.name} `}</span>
                      is uploaded.
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <div className="finals">
                {/* <progress
                  className="imageuplaod__progress"
                  value={progress}
                  max="100"
                /> */}
                <LinearProgress
                  variant="determinate"
                  value={progress}
                ></LinearProgress>

                <Button onClick={handleUpload} className="button_upload">
                  Upload
                </Button>
              </div>
            </div>

            <div className="row">
              <div className="dropdown_container col-sm-12 col-md-6 col-lg-6">
                <div>
                  {" "}
                  <label>Question Category</label>
                </div>
                <div className="input-group mb-3">
                  <select
                    className="custom-select"
                    id="inputGroupSelect02"
                    value={cat}
                    onChange={catChange}
                  >
                    <option defaultValue=" ">Category</option>
                    <option value="Rijmen">Rijmen</option>
                    <option value="Rekenen">Rekenen</option>
                    <option value="Kleuren">Kleuren</option>
                  </select>
                  <div className="input-group-append">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect02"
                    >
                      Options
                    </label>
                  </div>
                </div>
              </div>
              <div className="dropdown_container col-sm-12 col-md-6 col-lg-6">
                <div>
                  {" "}
                  <label>Question Level</label>
                </div>
                <div className="input-group mb-3">
                  <select
                    className="custom-select"
                    id="inputGroupSelect02"
                    value={level}
                    onChange={levelChange}
                  >
                    <option defaultValue=" ">Level</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <div className="input-group-append">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect02"
                    >
                      Options
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="button_upload"
              variant="primary"
              onClick={() => {
                send();
              }}
            >
              Submit
            </Button>
            <hr />
          </Form.Group>
        </div>
      </div>
    </div>
  );
}
