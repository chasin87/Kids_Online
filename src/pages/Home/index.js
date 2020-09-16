import React from "react";
import "./index.css";
import HeaderImage from "../../Components/HeaderImage";
import MemorySCS from "../../Images/MemorySCS.png";

export default function Home() {
  return (
    <div>
      {<HeaderImage />}

      <div className="cards">
        <div className="card">
          <div className="card_image">
            <img src={MemorySCS} alt="background" />
          </div>
          <div className="card_header">Colors</div>
          <div className="card_text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <a href="/kleuren">
            <button className="card_button">Play Colors</button>
          </a>
        </div>

        <div className="card">
          <div className="card_image">
            <img src={MemorySCS} alt="background" />
          </div>
          <div className="card_header">TicTacToe</div>
          <div className="card_text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <a href="/tictactoe">
            <button className="card_button">Play TicTacToe</button>
          </a>
        </div>

        <div className="card">
          <div className="card_image">
            <img src={MemorySCS} alt="background" />
          </div>
          <div className="card_header">Memory</div>
          <div className="card_text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <a href="/memory">
            <button className="card_button">Play Memory</button>
          </a>
        </div>
      </div>
    </div>
  );
}
