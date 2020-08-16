import React, { useState } from "react";
import "./index.css";

import useSound from "use-sound";
import Rood from "../../Sounds/Rood.mp3";
import Geel from "../../Sounds/Geel.mp3";
import Blauw from "../../Sounds/Blauw.mp3";
import Groen from "../../Sounds/Groen.mp3";

export default function ColorBox() {
  const [isChecked, setIsChecked] = useState(false);

  const [playRed] = useSound(Rood, { volume: 0.25 });
  const [playYellow] = useSound(Geel, { volume: 0.25 });
  const [playBlue] = useSound(Blauw, { volume: 0.25 });
  const [playGreen] = useSound(Groen, { volume: 0.25 });

  return (
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
    </div>
  );
}
