import React, { useState, useEffect } from "react";
import "./index.css";

const animals = [
  {
    name: "Beer",
    id: 1,
    status: false,
  },
  {
    name: "Beer",
    id: 2,
    status: false,
  },
  {
    name: "Giraffe",
    id: 4,
    status: false,
  },
  {
    name: "Giraffe",
    id: 5,
    status: false,
  },
  // {
  //   name: "Hond",
  //   id: 7,
  //   status: false,
  // },
  // {
  //   name: "Hond",
  //   id: 8,
  //   status: false,
  // },
  // {
  //   name: "Koala",
  //   id: 10,
  // },
  // {
  //   name: "Koala",
  //   id: 11,
  // },
  // {
  //   name: "Konijn",
  //   id: 13,
  // },
  // {
  //   name: "Konijn",
  //   id: 14,
  // },
  // {
  //   name: "Leeuw",
  //   id: 16,
  // },
  // {
  //   name: "Leeuw",
  //   id: 17,
  // },
  // {
  //   name: "Nijlpaard",
  //   id: 19,
  // },
  // {
  //   name: "Nijlpaard",
  //   id: 20,
  // },
  // {
  //   name: "Olifant",
  //   id: 22,
  // },
  // {
  //   name: "Olifant",
  //   id: 23,
  // },
  // {
  //   name: "Panda",
  //   id: 25,
  // },
  // {
  //   name: "Panda",
  //   id: 26,
  // },
  // {
  //   name: "Pinguen",
  //   id: 28,
  // },
  // {
  //   name: "Pinguen",
  //   id: 29,
  // },
  // {
  //   name: "Poes",
  //   id: 31,
  // },
  // {
  //   name: "Poes",
  //   id: 32,
  // },
  // {
  //   name: "Tijger",
  //   id: 34,
  // },
  // {
  //   name: "Tijger",
  //   id: 35,
  // },
  // {
  //   name: "Vos",
  //   id: 37,
  // },
  // {
  //   name: "Vos",
  //   id: 38,
  // },
  // {
  //   name: "Wasbeer",
  //   id: 40,
  // },
  // {
  //   name: "Wasbeer",
  //   id: 41,
  // },
  // {
  //   name: "Zebra",
  //   id: 43,
  //   key: 1,
  // },
  // {
  //   name: "Zebra",
  //   id: 44,
  //   key: 1,
  // },
];

export default function Flip() {
  const [cards, setCards] = useState([]);
  const [matchArray, setMatchArray] = useState([]);
  const [firstCard, setFirstCard] = useState([]);
  const [secondCard, setSecondCard] = useState([]);

  useEffect(() => {
    const shuffle = (array) => {
      array.sort(() => Math.random() - 0.5);
    };
    shuffle(animals);
  }, []);

  useEffect(() => {
    setCards(animals);
  }, []);

  const Handle = (card) => {
    setMatchArray([
      ...matchArray,
      { id: card.id, name: card.name, status: (card.status = true) },
    ]);

    if (firstCard.length < 1) {
      setFirstCard([
        { id: card.id, name: card.name, status: (card.status = true) },
      ]);
    } else if (secondCard.length < 1) {
      setSecondCard([
        { id: card.id, name: card.name, status: (card.status = true) },
      ]);
    }
  };

  function handleRemover(card) {
    setMatchArray([
      { id: card.id, name: card.name, status: (card.status = false) },
    ]);
    setMatchArray([]);
  }

  let set = 0;

  console.log("FirstCard", firstCard);
  console.log("SecondCard", secondCard);

  let firstt = firstCard.map((firsttt) => {
    return [{ name: firsttt.name, status: firsttt.status }];
  });

  let secondd = secondCard.map((seconddd) => {
    set = +1;
    return [{ name: seconddd.name, status: seconddd.status }];
  });

  if (set === 1 && JSON.stringify(firstt) === JSON.stringify(secondd)) {
    console.log("yes");
    setFirstCard([]);
    setSecondCard([]);
  } else if (set === 1 && JSON.stringify(firstt) !== JSON.stringify(secondd)) {
    setTimeout(() => {
      cards.map((card) => {
        return { ...cards, status: (card.status = false) };
      });
      setFirstCard([]);
      setSecondCard([]);
      setMatchArray([]);
    }, 1000);
  }

  return (
    <div>
      <div className="container">
        <div className="Cards">
          <div className="Cards_In">
            {cards.map((card) => {
              return (
                <div>
                  {card.status ? (
                    <div
                      className="Front"
                      onClick={() => {
                        handleRemover(card);
                      }}
                    >
                      <img
                        className="image"
                        src={require(`./images/${card.name}.png`)}
                        alt="animals"
                      />
                    </div>
                  ) : (
                    <div
                      className="Back "
                      onClick={() => {
                        Handle(card);
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
