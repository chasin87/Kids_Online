import React, { useState } from "react";
import "./index.css";

import useSound from "use-sound";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

//Import Sounds
import huis from "../Quiz/Sounds/huis.m4a";
import muis from "../Quiz/Sounds/muis.m4a";
import vogel from "../Quiz/Sounds/vogel.m4a";
import olifant from "../Quiz/Sounds/olifant.m4a";
import paard from "../Quiz/Sounds/paard.m4a";

export const questions = [
  {
    question_id: 1,
    question_text: "Wat rijmt er op huis?",
    question_category: "Rijmen",
    question: "huis",
    question_sound: "huis",
    answer_a: "vogel",
    answer_b: "paard",
    answer_c: "muis",
    answer_d: "olifant",
  },
  // {
  //   question_id: 2,
  //   question_text: "Wat rijmt er op deur?",
  //   question_category: "Rijmen",
  //   question: "deur",
  //   question_sound: "deur",
  //   answer_a: "geur",
  //   answer_b: "dak",
  //   answer_c: "raam",
  //   answer_d: "kraan",
  // },
];

export default function Quiz() {
  const [isChecked, setIsChecked] = useState(false);

  const [playhuis] = useSound(huis, { volume: 2.0 });
  const [playmuis] = useSound(muis, { volume: 2.0 });
  const [playvogel] = useSound(vogel, { volume: 2.0 });
  const [playolifant] = useSound(olifant, { volume: 2.0 });
  const [playpaard] = useSound(paard, { volume: 2.0 });

  return (
    <div>
      <div className="container_quiz">
        <div className="title_quiz">Quiz</div>
        <div className="question_header">
          {questions.map((quest) => {
            return (
              <img
                className="image_question_header"
                key={quest.quistion_id}
                src={require(`./images/${quest.question}.png`)}
                alt="question_1"
              />
            );
          })}
        </div>
        <div className="header_button">
          <button
            className="sound_question_header"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playhuis() : playhuis();
            }}
          >
            <VolumeUpIcon />
          </button>
        </div>

        <div className="question_answers">
          <section className="secsec">
            <div className="single_answer">
              {questions.map((quest) => {
                return (
                  <button className="answer">
                    <img
                      className="answer"
                      key={quest.quistion_id}
                      src={require(`./images/${quest.answer_a}.png`)}
                      alt="question_1"
                    />
                  </button>
                );
              })}

              <button
                className="sound_answer_header"
                onClick={() => setIsChecked(!isChecked)}
                onMouseUp={() => {
                  isChecked ? playvogel() : playvogel();
                }}
              >
                <VolumeUpIcon />
              </button>
            </div>

            <div className="single_answer">
              {questions.map((quest) => {
                return (
                  <button className="answer">
                    <img
                      className="answer"
                      key={quest.quistion_id}
                      src={require(`./images/${quest.answer_b}.png`)}
                      alt="question_1"
                    />
                  </button>
                );
              })}

              <button
                className="sound_answer_header"
                onClick={() => setIsChecked(!isChecked)}
                onMouseUp={() => {
                  isChecked ? playpaard() : playpaard();
                }}
              >
                <VolumeUpIcon />
              </button>
            </div>
          </section>
          <section className="secsec">
            <div className="single_answer">
              {questions.map((quest) => {
                return (
                  <button className="answer">
                    <img
                      className="answer"
                      key={quest.quistion_id}
                      src={require(`./images/${quest.answer_c}.png`)}
                      alt="question_1"
                    />
                  </button>
                );
              })}

              <button
                className="sound_answer_header"
                onClick={() => setIsChecked(!isChecked)}
                onMouseUp={() => {
                  isChecked ? playmuis() : playmuis();
                }}
              >
                <VolumeUpIcon />
              </button>
            </div>

            <div className="single_answer">
              {questions.map((quest) => {
                return (
                  <button className="answer">
                    <img
                      className="answer"
                      key={quest.quistion_id}
                      src={require(`./images/${quest.answer_d}.png`)}
                      alt="question_1"
                    />
                  </button>
                );
              })}

              <button
                className="sound_answer_header"
                onClick={() => setIsChecked(!isChecked)}
                onMouseUp={() => {
                  isChecked ? playolifant() : playolifant();
                }}
              >
                <VolumeUpIcon />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
