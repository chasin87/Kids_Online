import React, { useState, useEffect } from "react";
import { CustomInput, FormGroup, Input, Label } from "reactstrap";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import Axios from "axios";
import "./Add_Question.css";
import { Redirect } from "react-router";
import { selectquizzes } from "../../Store/quizlist/selectors";
import { fetchQuizList } from "../../Store/quizlist/actions";
import { selectanswers } from "../../Store/answerlist/selectors";
import { fetchAnswerList } from "../../Store/answerlist/actions";
import { fetchAnswerQuantity } from "../../Store/quantity/actions";
import { selectquantity } from "../../Store/quantity/selectors";
import { updateStatus } from "../../Store/quizlist/actions";
import { selectUser } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";

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
  const answerCount = 0;
  const nextquest = 1;
  let setter = 0;

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
  const inputChange = (event) => {
    setAnswer(event.target.value);
  };

  const checker = () => {
    checkAnswer ? setCheckAnswer(false) : setCheckAnswer(true);
  };

  const dispatch = useDispatch();

  const defId = referenceId;

  useEffect(() => {
    dispatch(fetchQuizList());
    dispatch(updateStatus());
    dispatch(fetchAnswerList());
    dispatch(fetchAnswerQuantity());
  }, [dispatch]);

  const Quizzes = useSelector(selectquizzes);
  const Answers = useSelector(selectanswers);
  const Quantity = useSelector(selectquantity);
  const quant = Quantity.map((quant) => {
    return quant.qua.length + answerCount;
  });

  const totalanswers = quant;

  setter = totalanswers[0] + nextquest;

  const checkAnswers = () => {
    Answers.map((checkAns) => {
      return console.log("checkedanswers", checkAns.answer);
    });
  };

  //answer text and imageUrl post to Db
  const send = (event) => {
    setTimeout(() => {
      if (answer === "" || imageUp === [] || soundUp === []) {
        return alert("Please fill all fields and upload all files");
      } else {
        if (images.length === 0 || sounds.length === 0) {
          return alert("Please upload all files");
        } else {
          // const progress = Math.round((100 * event.loaded) / event.total);
          // setProgress(progress);
          const data = new FormData();
          data.append("answer", answer);
          data.append("answerImage", images);
          data.append("answerSound", sounds);
          data.append("quizId", defId);
          data.append("isCorrect", checkAnswer);

          Axios.post("http://localhost:8888/answer", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }
        dispatch(fetchAnswerQuantity());
        dispatch(fetchAnswerQuantity(defId));
        // setAnswerCount(answerCount + 1);
        setAnswer("");
        setCheckAnswer(false);
        setUploadedText(false);
        setUploadedTextSound(false);

        if (setter === quantityQuestion) {
          dispatch(updateStatus(defId));
        }
      }
    }, 400);
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
    }
  };

  // const delete_question = () => {
  //   Axios.delete(`http://localhost:8888/upload/${idToDelete}`).then((res) => {
  //     console.log(res);
  //     console.log(res.data);
  //     dispatch(fetchQuizList());
  //   });

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
      <div className="Answers_Missing">
        <h5 style={{ color: "#000" }}>Questions without answers</h5>
        <h6>Please select a question below:</h6>
        {Quizzes.map((quiz) => {
          return quiz.questionComplete ? null : (
            <ListGroup key={quiz.id}>
              <ListGroup.Item
                onClick={(e) => {
                  setReferenceId(quiz.id);
                  setWorking(quiz.question);
                  dispatch(fetchAnswerQuantity(quiz.id, quiz.question));
                }}
              >
                {quiz.question}
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </div>
      <div>
        {working ? (
          <div>
            <h5 style={{ fontWeight: "700", color: "green" }}>
              Working on: {working}{" "}
            </h5>
            <h5 className="answersCheck" onClick={checkAnswers}>
              {" "}
              This question has {totalanswers} answer(s) stored. Click to see
            </h5>
          </div>
        ) : (
          <h5 style={{ fontWeight: "700", color: "red" }}>
            Nothing selected, Please select a question ⤴
          </h5>
        )}
      </div>

      <div></div>

      <div className="dropdown_container">
        <div>
          <label className="quantity_Label">
            Choose the amount of answers that you want to add the question
          </label>
        </div>

        <div className="input-quantity">{options()}</div>
      </div>

      {defId === 0 ? (
        ""
      ) : (
        <div className="question_part">
          <div className="Form_answer">
            {/* Answer1 */}
            <Form.Group>
              <p>
                Answer {setter} of {quantityQuestion}
              </p>
              <label>Answer in text</label>
              <Input
                type="text"
                name="text"
                id="answer_main"
                placeholder="Enter your answer in text"
                onChange={inputChange}
                value={answer}
              />
              <Label check>
                <Input
                  type="checkbox"
                  checked={checkAnswer}
                  onChange={checker}
                />{" "}
                Correct answer "Check if true"
              </Label>

              {/* ImageUpload */}

              <div className="imageUpload">
                <FormGroup>
                  <label>Answer Image</label>
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

                {/* SoundUpload */}
                <div className="soundUpload ">
                  <FormGroup>
                    <label>Answer Sound</label>
                    <CustomInput
                      type="file"
                      id="exampleCustomFileBrowser"
                      name="customFile"
                      label="Choose sound file..."
                      accept=".m4a, .mp3"
                      onChange={handleChangeSound}
                    />
                  </FormGroup>

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
              </div>
            </Form.Group>

            <div className="finals">
              <LinearProgress
                variant="determinate"
                value={progress}
              ></LinearProgress>
            </div>
            <div>
              <Button onClick={handleUpload} className="button_upload">
                Upload
              </Button>
            </div>
            <div>
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
