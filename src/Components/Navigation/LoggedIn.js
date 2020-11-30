import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../Store/user/actions";

export default function LoggedIn() {
  const dispatch = useDispatch();

  return (
    <>
      <a className="admin" href="/" onClick={() => dispatch(logOut())}>
        Admin Logout
      </a>
    </>
  );
}
