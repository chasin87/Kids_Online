import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import "./index.css";

export default function Flip() {
  const animals = [
    {
      name: "Beer",
      id: 1,
    },
    {
      name: "Beer",
      id: 2,
    },
    {
      name: "Giraffe",
      id: 3,
    },
    {
      name: "Giraffe",
      id: 4,
    },
    { name: "Hond", id: 5 },
    {
      name: "Hond",
      id: 6,
    },
    {
      name: "Koala",
      id: 7,
    },
    {
      name: "Koala",
      id: 8,
    },
    {
      name: "Konijn",
      id: 9,
    },
    {
      name: "Konijn",
      id: 10,
    },
    {
      name: "Leeuw",
      id: 11,
    },
    {
      name: "Leeuw",
      id: 12,
    },
    {
      name: "Nijlpaard",
      id: 13,
    },
    {
      name: "Nijlpaard",
      id: 14,
    },
    {
      name: "Olifant",
      id: 15,
    },
    {
      name: "Olifant",
      id: 16,
    },
    {
      name: "Panda",
      id: 17,
    },
    {
      name: "Panda",
      id: 18,
    },
    {
      name: "Pinguen",
      id: 19,
    },
    {
      name: "Pinguen",
      id: 20,
    },
    {
      name: "Poes",
      id: 21,
    },
    {
      name: "Poes",
      id: 22,
    },
    {
      name: "Tijger",
      id: 23,
    },
    {
      name: "Tijger",
      id: 24,
    },
    {
      name: "Vos",
      id: 25,
    },
    {
      name: "Vos",
      id: 26,
    },
    {
      name: "Wasbeer",
      id: 27,
    },
    {
      name: "Wasbeer",
      id: 28,
    },
    {
      name: "Zebra",
      id: 29,
    },
    {
      name: "Zebra",
      id: 30,
    },
  ];

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(animals);

  return (
    <div className="container">
      <div className="Cards">
        <div className="Cards_In">
          {animals.map((animal) => {
            return (
              <Flippy
                flipOnClick={true} // default false
                flipDirection="horizontal" // horizontal or vertical
              >
                <FrontSide className="Front"> </FrontSide>
                <BackSide className="Back">
                  {" "}
                  <img
                    className="image"
                    src={require(`./images/${animal.name}.png`)}
                    alt="animals"
                  />{" "}
                </BackSide>
              </Flippy>
            );
          })}
        </div>
      </div>
    </div>
  );
}
