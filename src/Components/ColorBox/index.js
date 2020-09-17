import React, { useState } from "react";
import "./index.css";

import useSound from "use-sound";

// Import Colors
import Rood from "../../Sounds/Rood.mp3";
import Geel from "../../Sounds/Geel.mp3";
import Blauw from "../../Sounds/Blauw.mp3";
import Groen from "../../Sounds/Groen.mp3";
import Bruin from "../../Sounds/Bruin.mp3";
import Oranje from "../../Sounds/Oranje.mp3";
import Paars from "../../Sounds/Paars.mp3";
import Roos from "../../Sounds/Roos.mp3";
import Wit from "../../Sounds/Wit.mp3";
import Zwart from "../../Sounds/Zwart.mp3";

export default function ColorBox() {
  // const [language, setLanguage] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const [playRed] = useSound(Rood, { volume: 0.25 });
  const [playYellow] = useSound(Geel, { volume: 0.25 });
  const [playBlue] = useSound(Blauw, { volume: 0.25 });
  const [playGreen] = useSound(Groen, { volume: 0.25 });
  const [playBrown] = useSound(Bruin, { volume: 0.25 });
  const [playOrange] = useSound(Oranje, { volume: 0.25 });
  const [playPurple] = useSound(Paars, { volume: 0.25 });
  const [playPink] = useSound(Roos, { volume: 0.25 });
  const [playWhite] = useSound(Wit, { volume: 0.25 });
  const [playBlack] = useSound(Zwart, { volume: 0.25 });

  return (
    <div>
      <div className="container">
        <div className="title">Color Box</div>

        <div className="game_status"></div>
        <div className="ColorBox">
          <div
            className="ColorBoxRed"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playRed() : playRed();
            }}
          />

          <div
            className="ColorBoxYellow"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playYellow() : playYellow();
            }}
          />

          <div
            className="ColorBoxBlue"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playBlue() : playBlue();
            }}
          />

          <div
            className="ColorBoxGreen"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playGreen() : playGreen();
            }}
          />

          <div
            className="ColorBoxBrown"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playBrown() : playBrown();
            }}
          />
          <div
            className="ColorBoxOrange"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playOrange() : playOrange();
            }}
          />
          <div
            className="ColorBoxPurple"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playPurple() : playPurple();
            }}
          />
          <div
            className="ColorBoxPink"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playPink() : playPink();
            }}
          />
          <div
            className="ColorBoxWhite"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playWhite() : playWhite();
            }}
          />
          <div
            className="ColorBoxBlack"
            onClick={() => setIsChecked(!isChecked)}
            onMouseUp={() => {
              isChecked ? playBlack() : playBlack();
            }}
          />
        </div>
      </div>
    </div>
  );
}
