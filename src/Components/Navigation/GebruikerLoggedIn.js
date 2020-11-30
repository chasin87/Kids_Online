import React from "react";
import { useDispatch } from "react-redux";
import { gebruikerLogOut } from "../../Store/gebruiker/actions";
import lock from "../../Images/lock.png";

export default function GebruikerLoggedIn() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  return (
    <>
      <a className="login" href="/" onClick={() => dispatch(gebruikerLogOut())}>
        <img className="icon_lock" src={lock} alt="Lock" path="/login" />
        Gebruiker Logout
      </a>
    </>
  );
}
