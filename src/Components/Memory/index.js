import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import "./index.css";

export default function Flip() {
  const animals = [
    "Hond",
    "Beer",
    "Giraffe",
    "Koala",
    "Konijn",
    "Leeuw",
    "Nijlpaard",
    "Olifant",
    "Panda",
    "Pinguen",
    "Poes",
    "Tijger",
    "Vos",
    "Wasbeer",
    "Zebra",
  ];

  return (
    <div className="container">
      {animals.map((animal) => {
        return (
          <Flippy
            flipOnClick={true} // default false
            flipDirection="horizontal" // horizontal or vertical
          >
            <FrontSide className="Front"> </FrontSide>
            <BackSide className="Back">
              {" "}
              <div>
                <img
                  className="image"
                  src={require(`./images/${animal}.png`)}
                />
              </div>
            </BackSide>
          </Flippy>
        );
      })}
    </div>
  );
}
