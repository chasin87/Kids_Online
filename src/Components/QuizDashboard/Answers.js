import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import Axios from "axios";
import "./Add_Question.css";

//DB FIREBASE
import { storage, db } from "../../firebase";
import firebase from "firebase";

//Import UI elements
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { FormGroup, Input, Label } from "reactstrap";
import { Form, Button, Modal } from "react-bootstrap";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

import { selectquizzes } from "../../Store/quizlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";
import { fetchAnswerList } from "../../Store/answerlist/actions";
import { fetchAnswerQuantity } from "../../Store/quantity/actions";
import { selectquantity } from "../../Store/quantity/selectors";
import { updateStatus } from "../../Store/quizlist/actions";
import { selectUser } from "../../Store/user/selectors";
import { fetchAnswerListId } from "../../Store/answerId/actions";
import { selectanswersid } from "../../Store/answerId/selectors";

function Answers() {
  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }
  const [answer, setAnswer] = useState("");
  const [images, setImages] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [imageUp, setImageUp] = useState([]);
  const [soundUp, setSoundUp] = useState([]);
  const [progress, setProgress] = useState(0);
  const [referenceId, setReferenceId] = useState(0);
  const [working, setWorking] = useState();
  const [quantityQuestion, setQuantityQuestion] = useState(4);
  const [uploadedText, setUploadedText] = useState(false);
  const [uploadedTextSound, setUploadedTextSound] = useState(false);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const defId = referenceId;

  useEffect(() => {
    dispatch(fetchQuizList());
    dispatch(fetchAnswerList());
    dispatch(fetchAnswerQuantity());
  }, [dispatch, defId]);

  useEffect(() => {
    dispatch(fetchAnswerListId(defId));
  }, [dispatch, defId]);

  const Quizzes = useSelector(selectquizzes);
  const Quantity = useSelector(selectquantity);
  const AnswerId = useSelector(selectanswersid);

  const answerCount = 0;
  const nextquest = 1;
  let setter = 0;

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const inputChange = (event) => {
    setAnswer(event.target.value);
  };

  const checker = () => {
    checkAnswer ? setCheckAnswer(false) : setCheckAnswer(true);
  };

  const checkAnswers = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const quant = Quantity.map((quant) => {
    return quant.qua.length + answerCount;
  });

  const totalanswers = quant;

  setter = totalanswers[0] + nextquest;

  //answer text and imageUrl post to Db
  const send = (event) => {
    setTimeout(() => {
      if (answer === "" || imageUp === [] || soundUp === []) {
        return alert("Please fill all fields and upload all files");
      } else {
        if (images.length === 0 || sounds.length === 0) {
          return alert("Please upload all files");
        } else {
          const data = new FormData();
          data.append("answer", answer);
          data.append("answerImage", images);
          data.append("answerSound", sounds);
          data.append("quizId", defId);
          data.append("isCorrect", checkAnswer);

          Axios.post("https://kids-online.herokuapp.com/answer", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }
        dispatch(fetchAnswerList());
        dispatch(fetchAnswerQuantity());
        dispatch(fetchAnswerQuantity(defId));
        dispatch(fetchAnswerListId(defId));

        setAnswer("");
        setCheckAnswer(false);
        setUploadedText(false);
        setUploadedTextSound(false);

        if (setter === quantityQuestion) {
          dispatch(updateStatus(defId));
        } else {
          return null;
        }
        setVisible(false);
      }
    }, 500);
    dispatch(fetchAnswerList());
    inputRef.current.value = "";
    setImageUp([]);
    inputRef2.current.value = "";
    setSoundUp([]);
  };

  //image upload to firebase
  const handleUpload = () => {
    if (imageUp.length <= 3 || soundUp.length <= 3) {
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
      setVisible(true);
    }
  };

  //sound upload to firebase
  const handleUploadSound = () => {
    if (soundUp.length === 0) {
      alert("Kies een geluidsbestand...");
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

  const options = () => {
    if (setter === 1) {
      return (
        <select
          className="custom-select"
          id="inputGroupSelect02"
          value={quantityQuestion}
          onChange={(e) => setQuantityQuestion(parseInt(e.target.value))}
        >
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      );
    } else if (setter === 2) {
      return (
        <select
          className="custom-select"
          id="inputGroupSelect02"
          value={quantityQuestion}
          onChange={(e) => setQuantityQuestion(parseInt(e.target.value))}
        >
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      );
    } else if (setter === 3) {
      return (
        <select
          className="custom-select"
          id="inputGroupSelect02"
          value={quantityQuestion}
          onChange={(e) => setQuantityQuestion(parseInt(e.target.value))}
        >
          <option>3</option>
          <option>4</option>
        </select>
      );
    } else {
      return (
        <select
          className="custom-select"
          id="inputGroupSelect02"
          value={quantityQuestion}
          onChange={(e) => setQuantityQuestion(parseInt(e.target.value))}
        >
          <option>4</option>
        </select>
      );
    }
  };

  return setter <= quantityQuestion ? (
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
      <div className="Answers_Missing">
        <h5 style={{ color: "#000" }}>Vragen zonder antwoorden</h5>
        <h6>Selecteer hieronder een vraag:</h6>
        {Quizzes.map((quiz) => {
          return quiz.questionComplete ? null : (
            <List
              component="nav"
              aria-label="main mailbox folders"
              key={quiz.id}
            >
              <ListItem
                key={quiz.id}
                selected={selectedIndex === quiz.id}
                onClick={(e) => {
                  setReferenceId(quiz.id);
                  setWorking(quiz.question);
                  dispatch(fetchAnswerQuantity(quiz.id, quiz.question));
                  setSelectedIndex(quiz.id);
                }}
              >
                {quiz.question}
              </ListItem>
            </List>
          );
        })}
      </div>

      <div>
        {working ? (
          <div>
            {/* <h5 style={{ fontWeight: "700", color: "green" }}>
              U Bewerkt de vraag: {working}{" "}
            </h5> */}
            <div className="dropdown_container">
              <div>
                <label className="quantity_Label">
                  Kies het aantal antwoorden dat u aan de vraag wilt toevoegen
                </label>
              </div>

              <div className="input-quantity">{options()}</div>
            </div>
            <div
              style={{
                width: "70%",
                fontSize: "15px",
                margin: "auto",
                color: "#f43f5a",
                fontWeight: "500",
              }}
            >
              <List>
                {totalanswers[0] === 0 ? (
                  <ListItem onClick={checkAnswers}>
                    <div>
                      Deze vraag heeft <strong> geen </strong>
                      opgeslagen antwoord(en).
                    </div>
                  </ListItem>
                ) : (
                  <ListItem onClick={checkAnswers}>
                    <div>
                      Deze vraag heeft <strong>{totalanswers}</strong>{" "}
                      opgeslagen antwoord(en). Klik hier om deze te zien.
                    </div>
                  </ListItem>
                )}
              </List>
            </div>
          </div>
        ) : (
          <h5 style={{ fontWeight: "700", color: "red" }}>
            Niets geselecteerd, selecteer een vraag ⤴
          </h5>
        )}
      </div>

      <div></div>
      <div>
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header className="header_modal">
            <Modal.Title>Antwoorden</Modal.Title>
          </Modal.Header>
          {AnswerId.map((ansId) => {
            return (
              <Modal.Body key={ansId.id}>
                {ansId.answer} - {ansId.isCorrect.toString()}
              </Modal.Body>
            );
          })}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {defId === 0 ? (
        ""
      ) : (
        <div className="question_part">
          <div className="Form_answer">
            {/* Answer1 */}
            <Form.Group>
              <p>
                Antwoord {setter} van {quantityQuestion}
              </p>
              <label>Antwoord in tekst</label>
              <Input
                type="text"
                name="text"
                id="answer_main"
                placeholder="Typ uw antwoord in tekst"
                onChange={inputChange}
                value={answer}
              />
              <Label check>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkAnswer}
                      onChange={checker}
                    ></Checkbox>
                  }
                  label="Juist antwoord (Vink aan als de antwoord correct is)"
                />
              </Label>

              <div className="imageUpload">
                <FormGroup>
                  <label>Antwoord Afbeelding</label>
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

                {/* SoundUpload */}
                <div className="soundUpload ">
                  <FormGroup>
                    <label>Antwoord Audio</label>
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
                        Audio met bestandsnaam
                        <span className="uploaded_file">{` ${soundUp.name} `}</span>
                        is geüpload.
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
              </div>
            </Form.Group>

            <div className="finals">
              <LinearProgress
                variant="determinate"
                value={progress}
              ></LinearProgress>
            </div>
            <div className="two_Buttons">
              <div style={{ margin: "20px" }}>
                <button
                  onClick={handleUpload}
                  className="button_upload shadow-none"
                >
                  Uploaden
                </button>
              </div>

              {visible ? (
                <div style={{ margin: "20px" }}>
                  <button
                    type="submit"
                    className="button_upload shadow-none"
                    variant="primary"
                    onClick={() => {
                      send();
                    }}
                  >
                    Verzenden
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Redirect to="/QuizQuestions" />
  );
}

export default Answers;
