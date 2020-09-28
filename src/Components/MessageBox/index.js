import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage } from "../../Store/appState/selectors";
import { Alert } from "react-bootstrap";
import { clearMessage } from "../../Store/appState/actions";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const showMessage = message !== null;
  if (!showMessage) return null;

  return (
    <Alert
      show={showMessage}
      variant={message.variant}
      dismissible={message.dismissable}
      onClose={message.dismissable ? () => dispatch(clearMessage()) : null}
    >
      {message.text}
    </Alert>
  );
}
