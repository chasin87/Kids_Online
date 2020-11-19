import React, { useState, useEffect } from "react";
import { CustomInput, FormGroup, Input, Label } from "reactstrap";
import { Form, Button } from "react-bootstrap";
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

  const [uploadedText, setUploadedText] = useState(false);
  const [uploadedTextSound, setUploadedTextSound] = useState(false);
  const [answerCount, setAnswerCount] = useState([1]);
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
    setCheckAnswer(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuizList());
  }, [dispatch]);

  const Quizzes = useSelector(selectquizzes);

  const quizId = Quizzes.map((quiz) => {
    return quiz.id;
  });

  const defId = quizId.slice(-1)[0];

  //answer text and imageUrl post to Db
  const send = (event) => {
    if (answer === "" || imageUp === " " || soundUp === " ") {
      return alert("Please fill all questions and upload all files");
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
      setAnswerCount(answerCount + [1]);
      setAnswer(" ");
      setCheckAnswer(false);
      setUploadedText(false);
      setUploadedTextSound(false);
    }
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

  if (answerCount.length < 5) {
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
        <div className="question_part">
          <div className="Form_answer">
            {/* Answer1 */}
            <Form.Group>
              <p>Answer {answerCount.length} of 4</p>
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
                  onClick={checker}
                  unCh
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
      </div>
    );
  } else {
    return <Redirect to="/QuizQuestions" />;
  }
}

export default Answers;
