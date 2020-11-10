import React, { useState, useEffect } from "react";
import "./index.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { animals } from "./animals";

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
    setCards(animals);
  }, [cards]);

  useEffect(() => {
    if (count === 12) {
      setShow(true);
    }
  }, [count]);

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

  // useEffect(() => {
  //   setCards(animals);
  //   animals.map((card) => {
  //     return (card.status = false);
  //   });
  // }, [cards]);

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
      }, 700);
    }, 700);
  }

  return (
    <div>
      <div className="container_memory">
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
                      <div className="Front">
                        <img
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
      <div className="displayNonImages">
        {animals.map((ani) => {
          return (
            <img
              className="NonImages"
              src={require(`./images/${ani.name}.png`)}
              alt="AnimalNonImages"
            />
          );
        })}
      </div>
    </div>
  );
}
