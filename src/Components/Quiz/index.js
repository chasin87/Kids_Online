import React, { useState } from "react";
import "./index.css";

import useSound from "use-sound";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

//Import Sounds
import huis from "../Quiz/Sounds/huis.m4a";
import muis from "../Quiz/Sounds/muis.m4a";
import hond from "../Quiz/Sounds/hond.m4a";
import olifant from "../Quiz/Sounds/olifant.m4a";
import poes from "../Quiz/Sounds/poes.m4a";

export const questions = [
  {
    question_id: 1,
    question_text: "Wat rijmt er op huis?",
    question_category: "Rijmen",
    question: "huis",
    question_sound: "huis",
    answer_a: "hond",
    answer_b: "poes",
    answer_c: "muis",
    answer_d: "olifant",
  },
  {
    question_id: 2,
    question_text: "Wat rijmt er op deur?",
    question_category: "Rijmen",
    question: "deur",
    question_sound: "deur",
    answer_a: "geur",
    answer_b: "dak",
    answer_c: "raam",
    answer_d: "kraan",
  },
];

export default function Quiz() {
  const [isChecked, setIsChecked] = useState(false);

  const [playhuis] = useSound(huis, { volume: 2.0 });
  const [playmuis] = useSound(muis, { volume: 2.0 });
  const [playhond] = useSound(hond, { volume: 2.0 });
  const [playolifant] = useSound(olifant, { volume: 2.0 });
  const [playpoes] = useSound(poes, { volume: 2.0 });

  return (
    <div>
      <div className="container">
        <div className="title">Quiz</div>
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
                isChecked ? playhond() : playhond();
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
                isChecked ? playpoes() : playpoes();
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
        </div>
      </div>
    </div>
  );
}
