import React, { useState, useEffect } from "react";
import "./index.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const animals = [
  {
    name: "Beer",
    id: 1,
    status: false,
    match: false,
  },
  {
    name: "Beer",
    id: 2,
    status: false,
    match: false,
  },
  {
    name: "Giraffe",
    id: 4,
    status: false,
    match: false,
  },
  {
    name: "Giraffe",
    id: 5,
    status: false,
    match: false,
  },
  {
    name: "Hond",
    id: 7,
    status: false,
    match: false,
  },
  {
    name: "Hond",
    id: 8,
    status: false,
    match: false,
  },
  {
    name: "Koala",
    id: 10,
    status: false,
    match: false,
  },
  {
    name: "Koala",
    id: 11,
    status: false,
    match: false,
  },
  {
    name: "Konijn",
    id: 13,
    status: false,
    match: false,
  },
  {
    name: "Konijn",
    id: 14,
    status: false,
    match: false,
  },
  {
    name: "Leeuw",
    id: 16,
    status: false,
    match: false,
  },
  {
    name: "Leeuw",
    id: 17,
    status: false,
    match: false,
  },
  {
    name: "Nijlpaard",
    id: 19,
    status: false,
    match: false,
  },
  {
    name: "Nijlpaard",
    id: 20,
    status: false,
    match: false,
  },
  {
    name: "Olifant",
    id: 22,
    status: false,
    match: false,
  },
  {
    name: "Olifant",
    id: 23,
    status: false,
    match: false,
  },
  {
    name: "Panda",
    id: 25,
    status: false,
    match: false,
  },
  {
    name: "Panda",
    id: 26,
    status: false,
    match: false,
  },
  {
    name: "Pinguen",
    id: 28,
    status: false,
    match: false,
  },
  {
    name: "Pinguen",
    id: 29,
    status: false,
    match: false,
  },
  {
    name: "Poes",
    id: 31,
    status: false,
    match: false,
  },
  {
    name: "Poes",
    id: 32,
    status: false,
    match: false,
  },
  {
    name: "Tijger",
    id: 34,
    status: false,
    match: false,
  },
  {
    name: "Tijger",
    id: 35,
    status: false,
    match: false,
  },
  // {
  //   name: "Vos",
  //   id: 37,
  //   status: false,
  //   match: false,
  // },
  // {
  //   name: "Vos",
  //   id: 38,
  //   status: false,
  //   match: false,
  // },
  // {
  //   name: "Wasbeer",
  //   id: 40,
  //   status: false,
  //   match: false,
  // },
  // {
  //   name: "Wasbeer",
  //   id: 41,
  //   status: false,
  //   match: false,
  // },
  // {
  //   name: "Zebra",
  //   id: 43,
  //   status: false,
  //   match: false,
  // },
  // {
  //   name: "Zebra",
  //   id: 44,
  //   status: false,
  //   match: false,
  // },
];

export default function Flip() {
  const [cards, setCards] = useState([]);
  const [matchArray, setMatchArray] = useState([]);
  const [firstCard, setFirstCard] = useState([]);
  const [secondCard, setSecondCard] = useState([]);
  const [message, setMessage] = useState(["Let's Play, Memory"]);
  const [click, setClick] = useState(true);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 12) {
      setShow(true);
    }
  }, [count]);
  // console.log(count);

  const handleClose = () => {
    return [setShow(false), resetClick(), setCount(0)];
  };

  useEffect(() => {
    const shuffle = (array) => {
      array.sort(() => Math.random() - 0.5);
    };
    shuffle(animals);
  }, []);

  const resetClick = () => {
    cards.map((reset) => {
      return (
        setCards([
          ...cards,
          {
            status: (reset.status = false),
            match: (reset.match = false),
          },
        ]),
        setTimeout(() => {
          const shuffle = (array) => {
            array.sort(() => Math.random() - 0.5);
          };
          shuffle(animals);
          setMessage(["Let's Play, Memory"]);
        }, 300)
      );
    });
  };

  useEffect(() => {
    setCards(animals);
  }, [cards]);

  const Handle = (card) => {
    setMatchArray([
      ...matchArray,
      {
        id: card.id,
        name: card.name,
        status: (card.status = true),
      },
    ]);

    if (firstCard.length < 1) {
      setFirstCard([
        {
          id: card.id,
          name: card.name,
          status: (card.status = true),
        },
      ]);
    } else if (secondCard.length < 1) {
      setClick(false);
      setSecondCard([
        {
          id: card.id,
          name: card.name,
          status: (card.status = true),
        },
      ]);
    }
  };

  let set = 0;

  let firstt = firstCard.map((firsttt) => {
    return [{ name: firsttt.name, status: firsttt.status }];
  });

  let secondd = secondCard.map((seconddd) => {
    set = +1;
    return [{ name: seconddd.name, status: seconddd.status }];
  });

  if (set === 1 && JSON.stringify(firstt) === JSON.stringify(secondd)) {
    cards.forEach((filt) => {
      if (filt.status === true) {
        return (filt.match = true);
      }
    });

    setMessage(["You've got a match,"]);
    setCount(count + 1);
    setFirstCard([]);
    setSecondCard([]);
    setMatchArray([]);

    setClick(true);
  } else if (set === 1 && JSON.stringify(firstt) !== JSON.stringify(secondd)) {
    setTimeout(() => {
      setMessage(["oops!, thats not a Match"]);
      setFirstCard([]);
      setSecondCard([]);
      setMatchArray([]);

      cards.forEach((filt) => {
        if (filt.match !== true) {
          return {
            id: filt.id,
            name: filt.name,
            status: (filt.status = false),
          };
        }
      });
      setTimeout(() => {
        setClick(true);
      }, 500);
    }, 500);
  }

  return (
    <div>
      <div className="container">
        <div className="title">Memory</div>
        <div className="game_status_memory">
          {message}
          <div className="Cards">
            <div className="Cards_In">
              <Modal centered show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>Winner!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you won the game!!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Play again
                  </Button>
                </Modal.Footer>
              </Modal>

              {cards.map((card) => {
                return (
                  <div key={card.id}>
                    {card.status ? (
                      <div className="Front" key={card.id}>
                        <img
                          key={card.id}
                          className="image"
                          src={require(`./images/${card.name}.png`)}
                          alt="animals"
                        />
                      </div>
                    ) : (
                      <div
                        className="Back"
                        onClick={() => {
                          if (click === true) {
                            Handle(card);
                          }
                        }}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="butts">
          <button
            className="resetButton"
            onClick={() => {
              resetClick();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
