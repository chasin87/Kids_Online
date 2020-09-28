import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../Store/user/actions";

// import { selectUser } from "../../Store/user/selectors";
import lock from "../../Images/lock.png";

export default function LoggedIn() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  return (
    <>
      <a className="admin" href="/" onClick={() => dispatch(logOut())}>
        <img className="icon_lock" src={lock} alt="Lock" path="/admin" />
        Admin Logout
      </a>
    </>
  );
}
