import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function ShowScore(props) {
  return (
    <div className="scoreShower">
      <div className="headerScore">
        <h4>Hey {props.gebruiker} </h4>
      </div>

      <div className="mainScore">
        <h4>
          Je hebt {props.score} van de {props.filteredQuestionsLength} vragen
          goed beantwoord.
        </h4>
      </div>

      <div className="footScore">
        <Link className="linkLesson" to={{ pathname: `/Quiz` }}>
          <button className="button_showScore">Speel opnieuw</button>
        </Link>
      </div>
    </div>
  );
}
