import React, { useState } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import "./index.css";

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
    id: 4,
  },
  {
    name: "Giraffe",
    id: 5,
  },
  {
    name: "Hond",
    id: 7,
  },
  {
    name: "Hond",
    id: 8,
  },
  {
    name: "Koala",
    id: 10,
  },
  {
    name: "Koala",
    id: 11,
  },
  {
    name: "Konijn",
    id: 13,
  },
  {
    name: "Konijn",
    id: 14,
  },
  {
    name: "Leeuw",
    id: 16,
  },
  {
    name: "Leeuw",
    id: 17,
  },
  {
    name: "Nijlpaard",
    id: 19,
  },
  {
    name: "Nijlpaard",
    id: 20,
  },
  {
    name: "Olifant",
    id: 22,
  },
  {
    name: "Olifant",
    id: 23,
  },
  {
    name: "Panda",
    id: 25,
  },
  {
    name: "Panda",
    id: 26,
  },
  {
    name: "Pinguen",
    id: 28,
  },
  {
    name: "Pinguen",
    id: 29,
  },
  {
    name: "Poes",
    id: 31,
  },
  {
    name: "Poes",
    id: 32,
  },
  {
    name: "Tijger",
    id: 34,
  },
  {
    name: "Tijger",
    id: 35,
  },
  {
    name: "Vos",
    id: 37,
  },
  {
    name: "Vos",
    id: 38,
  },
  {
    name: "Wasbeer",
    id: 40,
  },
  {
    name: "Wasbeer",
    id: 41,
  },
  {
    name: "Zebra",
    id: 43,
  },
  {
    name: "Zebra",
    id: 44,
  },
];

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

shuffle(animals);

export default function Flip() {
  const [ids, setIds] = useState([]);

  function handle(id) {
    setIds([...ids, { id }]);
    console.log("this is id", id);
  }

  return (
    <div>
      <div className="container">
        <div className="Cards">
          <div className="Cards_In">
            {animals.map((animal) => {
              return (
                <Flippy
                  key={animal.id}
                  flipOnClick={true} // default false
                  flipDirection="horizontal" // horizontal or vertical
                >
                  {" "}
                  <FrontSide
                    className="Front"
                    onClick={() => {
                      handle(animal.id);
                    }}
                  ></FrontSide>
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
    </div>
  );
}
