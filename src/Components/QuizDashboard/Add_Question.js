import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Store/user/selectors";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import "./Add_Question.css";

//DB FIREBASE
import firebase from "firebase";
import { storage, db } from "../../firebase";

import Modal from "react-bootstrap/Modal";
import { FormGroup, Input } from "reactstrap";
import { Form, Button } from "react-bootstrap";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    history.push("/admin");
  }
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
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

  const handleClose = () => {
    setShow(false);
    setQuestion("");
    setCat("");
    setLevel(" ");
    setUploadedText(false);
    setUploadedTextSound(false);
    inputRef.current.value = "";
    setImageUp([]);
    inputRef2.current.value = "";
    setSoundUp([]);
  };

  //quesion text and imageUrl post to Db
  const send = (event) => {
    if (question === "" || imageUp === " " || cat === "" || level === null) {
      return alert("Vul alle vragen in en upload alle bestanden");
    } else {
      if (images.length === 0 || sounds.length === 0) {
        return alert("Upload eerst alle bestanden");
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

        Axios.post("https://kids-online.herokuapp.com/upload", data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        setShow(true);
      }
    }
  };

  //image upload to firebase
  const handleUpload = () => {
    if (imageUp.length === 0) {
      alert("Kies een afbeeldingsbestand ...");
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
      alert("Kies een geluidsbestand ...");
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
            Terug naar de vragen
          </Link>
        </div>
        <div className="next_to">
          <Link className="link_next" to="/QuizDashboard">
            Ga naar de dashboard
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
      <div className="container_title">Nieuwe Vraag</div>
      <Modal centered show={show}>
        <Modal.Header className="header_modal">
          <Modal.Title>Vraag geüpload!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Al uw tekst en bestanden zijn geüpload</Modal.Body>
        <Modal.Footer>
          <div className="button_Finish_Question">
            <Button variant="secondary">
              <Link to="/answers">Antwoorden toevoegen</Link>
            </Button>
          </div>
          <div className="button_Finish_Question">
            <Button variant="secondary" onClick={handleClose}>
              Nieuwe vraag toevoegen
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <div className="question_part">
        <div className="Form">
          <Form.Group>
            <label>Vraag in tekst</label>
            <Input
              type="text"
              name="text"
              id="question_main"
              placeholder="Typ uw vraag in tekst"
              onChange={inputChange}
              value={question}
            />

            {/* ImageUpload */}
            <div className="row">
              <div className="imageUpload col-sm-12 col-md-6 col-lg-6">
                <FormGroup>
                  <label>Vraag Afbeelding</label>
                  <label className="large-label" htmlFor="customFile">
                    <input
                      type="file"
                      id="exampleCustomFileBrowser"
                      name="customFile"
                      label="adsd"
                      accept=".png, .jpg, .jpeg"
                      onChange={(event) => setImageUp(event.target.files[0])}
                      ref={inputRef}
                    />
                  </label>
                </FormGroup>
                {/* ----- */}
                <div className="uploaded_text">
                  {uploadedText ? (
                    <p>
                      Afbeelding met bestandsnaam
                      <span className="uploaded_file">{` ${imageUp.name} `}</span>
                      is geüpload.
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>

              {/* SoundUpload */}
              <div className="soundUpload col-sm-12 col-md-6 col-lg-6">
                <FormGroup>
                  <label>Vraag Audio</label>
                  <label className="large-label" htmlFor="customFile">
                    <input
                      type="file"
                      id="exampleCustomFileBrowser"
                      name="customFile"
                      accept=".m4a, .mp3"
                      onChange={(event) => setSoundUp(event.target.files[0])}
                      ref={inputRef2}
                    />
                  </label>
                </FormGroup>

                <div className="uploaded_text">
                  {uploadedTextSound ? (
                    <p>
                      Audio met file bestandsnaam
                      <span className="uploaded_file">{` ${soundUp.name} `}</span>
                      is geüpload.
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <div className="finals">
                <LinearProgress
                  variant="determinate"
                  value={progress}
                ></LinearProgress>

                <Button
                  onClick={handleUpload}
                  className="button_upload shadow-none"
                >
                  Uploaden
                </Button>
              </div>
            </div>

            <div className="row">
              <div className="dropdown_container col-sm-12 col-md-6 col-lg-6">
                <div>
                  {" "}
                  <label>Vraag Categorie</label>
                </div>
                <div className="input-group mb-3">
                  <select
                    className="custom-select"
                    id="inputGroupSelect02"
                    value={cat}
                    onChange={catChange}
                  >
                    <option defaultValue=" ">Categorie</option>
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
                  <label>Vraag Level</label>
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
              className="button_upload shadow-none"
              variant="primary"
              onClick={() => {
                send();
              }}
            >
              Verzenden
            </Button>
            <hr />
          </Form.Group>
        </div>
      </div>
    </div>
  );
}
