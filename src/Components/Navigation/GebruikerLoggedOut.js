import React from "react";
import lock from "../../Images/lock.png";

export default function GebruikerLoggedOut() {
  return (
    <>
      <a className="login" href="login">
        <img className="icon_lock" src={lock} alt="Lock" path="/login" />
        Gebruiker login
      </a>
    </>
  );
}
