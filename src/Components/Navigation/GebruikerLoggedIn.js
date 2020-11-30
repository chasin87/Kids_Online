import React from "react";
import { useDispatch } from "react-redux";
import { gebruikerLogOut } from "../../Store/gebruiker/actions";

export default function GebruikerLoggedIn() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  return (
    <>
      <a className="login" href="/" onClick={() => dispatch(gebruikerLogOut())}>
        Gebruiker Logout
      </a>
    </>
  );
}
