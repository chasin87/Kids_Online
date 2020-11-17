import React from "react";
import "./index.css";
import HeaderImage from "../../Components/HeaderImage";
import Memory_logo_card from "../../Images/Memory_logo_card.png";
import TicTacToe_logo_card from "../../Images/TicTacToe_logo_card.png";
import Colors_logo_card from "../../Images/Colors_logo_card.png";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

export default function Home() {
  const history = createBrowserHistory();

  history.listen((location) => {
    ReactGA.initialize("UA-183228876-1");
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });

  return (
    <div>
      {<HeaderImage />}

      <div className="cards">
        <div className="cardd">
          <div className="card_image">
            <a href="/kleuren">
              <img src={Colors_logo_card} alt="background" />
            </a>
          </div>
          <div className="card_header">Colors</div>
          <div className="card_text">
            Learn the colors by pressing them, as soon as you press you will
            hear the color.
          </div>
          <div>
            <a href="/kleuren">
              <button className="card_button">Play Colors</button>
            </a>
          </div>
        </div>

        <div className="cardd">
          <div className="card_image">
            <a href="/tictactoe">
              <img src={TicTacToe_logo_card} alt="background" />
            </a>
          </div>
          <div className="card_header">TicTacToe</div>
          <div className="card_text">
            a game in which two players seek in alternate turns to complete a
            row, a column, or a diagonal.
          </div>
          <a href="/tictactoe">
            <button className="card_button">Play TicTacToe</button>
          </a>
        </div>

        <div className="cardd">
          <div className="card_image">
            <a href="/memory">
              <img src={Memory_logo_card} alt="background" />
            </a>
          </div>
          <div className="card_header">Memory</div>
          <div className="card_text">
            Train your brain! Play this game every day. Keep your brain in
            shape! Find pairs of images.
          </div>
          <a href="/memory">
            <button className="card_button">Play Memory</button>
          </a>
        </div>
      </div>
    </div>
  );
}
