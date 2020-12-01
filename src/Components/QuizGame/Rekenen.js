import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectGebruiker } from "../../Store/gebruiker/selectors";

export default function Rekenen() {
  const { gebruikerToken } = useSelector(selectGebruiker);
  const history = useHistory();
  if (gebruikerToken === null) {
    history.push("/login");
  }

  return (
    <div>
      <h2>Dit is de rekenen pagina</h2>
    </div>
  );
}
