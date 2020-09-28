import React from "react";
import lock from "../../Images/lock.png";

export default function LoggedOut() {
  return (
    <>
      <a className="admin" href="admin">
        <img className="icon_lock" src={lock} alt="Lock" path="/admin" />
        Admin Login
      </a>
    </>
  );
}
