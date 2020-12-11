import React from "react";
import "./index.css";
import HeaderImage from "../../Components/HeaderImage";
import Memory_logo_card from "../../Images/Memory_logo_card.png";
import TicTacToe_logo_card from "../../Images/TicTacToe_logo_card.png";
import Colors_logo_card from "../../Images/Colors_logo_card.png";
import Quiz from "../../Images/quiz.png";
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
            <a href="/Colors">
              <img src={Colors_logo_card} alt="background" />
            </a>
          </div>
          <div className="card_header">Leer de Kleuren</div>
          <div className="card_text">
            Leer de kleuren door erop te drukken, zodra je er op drukt, hoor je
            de kleur.
          </div>
          <div>
            <div>
              <a href="/colors">
                <button className="card_button">Speel Kleuren</button>
              </a>
            </div>
          </div>
        </div>

        <div className="cardd">
          <div className="card_image">
            <a href="/tictactoe">
              <img src={TicTacToe_logo_card} alt="background" />
            </a>
          </div>
          <div className="card_header">Boter kaas en eieren</div>
          <div className="card_text">
            Een spel waarin twee spelers om de beurt zoeken om een rij, kolom of
            diagonaal te voltooien.
          </div>
          <a href="/tictactoe">
            <button className="card_button">Speel Boter kaas en eieren</button>
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
            Train je hersenen! Speel dit spel elke dag. Houd je brein in vorm!
            Zoek de paren van de afbeeldingen.
          </div>
          <a href="/memory">
            <button className="card_button">Speel Memory</button>
          </a>
        </div>

        <div className="cardd">
          <div className="card_image">
            <a href="/quiz">
              <img src={Quiz} alt="background" />
            </a>
          </div>
          <div className="card_header">Quiz</div>
          <div className="card_text">
            De Quiz heeft verschillende categorien, zo kun je reken opdrachten
            doen maar ook rijmen. Het is maar net wat je vandaag wilt oefenen.
          </div>

          <a href="/quiz">
            <button className="card_button">Speel de Quiz</button>
          </a>
        </div>
      </div>
    </div>
  );
}
