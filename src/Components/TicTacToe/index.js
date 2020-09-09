import React, { useState } from "react";
import "./index.css";

export default function TicTacToe() {
  return (
    <div>
      <Board />
    </div>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board() {
  const [boardSquares, setBoardsquare] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    const squares = [...boardSquares];
    if (calculateWinner(boardSquares) || squares[index]) return;

    squares[index] = xIsNext ? "X" : "O";

    setBoardsquare(squares);

    setXIsNext(!xIsNext);
  };

  const resetClick = (index) => {
    const resets = Array(9).fill(null);
    setBoardsquare(resets);
    const resetPlayer = true;
    setXIsNext(resetPlayer);
  };

  const renderSquare = (index) => {
    return (
      <Square value={boardSquares[index]} onClick={() => handleClick(index)} />
    );
  };

  let status;
  const winner = calculateWinner(boardSquares);
  status = winner
    ? `Winner is ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="game">
      <div className="title">TicTacToe</div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <div className="butts">
        <button className="resetButton" onClick={resetClick}>
          Reset
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
