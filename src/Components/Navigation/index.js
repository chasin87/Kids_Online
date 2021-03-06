import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { selectToken } from "../../Store/user/selectors";
import { selectGebruiker } from "../../Store/gebruiker/selectors";
import { gebruikerSelectToken } from "../../Store/gebruiker/selectors";

import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

import GebruikerLoggedIn from "./GebruikerLoggedIn";
import GebruikerLoggedOut from "./GebruikerLoggedOut";

// Bootstrap imports
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//MaterialUI imports
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    margin: "auto",
  },
}));

function Navigation() {
  const token = useSelector(selectToken);
  const gebruikerToken = useSelector(gebruikerSelectToken);

  const gebruiker = useSelector(selectGebruiker);

  const classes = useStyles();

  const gebruikerControls = gebruikerToken ? (
    <GebruikerLoggedIn />
  ) : (
    <GebruikerLoggedOut />
  );

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;
  return (
    <header>
      <div className="top-bar">
        <div className="information_area">
          <div>Neem contact op via &nbsp;</div>
          <div>
            <a href="mailto:yasinyuksek87@gmail.com">
              {" "}
              yasinyuksek87@gmail.com
            </a>
          </div>
        </div>
        <div className="login_area">
          <ul>
            {gebruikerToken ? null : (
              <li>
                <a className="register" href="signUp">
                  Aanmelden
                </a>
              </li>
            )}
            <li>{gebruikerControls}</li>
            <li>{loginLogoutControls}</li>
          </ul>
        </div>
      </div>

      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          display: "inline-grid",
          width: "100%",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Navbar.Brand
          className="Title"
          bg="red"
          href="/"
          style={{ margin: "0px", width: "100%" }}
        >
          Kids Online
          <p className="subTitle" style={{ textAlign: "center" }}>
            Online school voor onze kinderen
          </p>
        </Navbar.Brand>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link " href="/">
              Home <span className="sr-only"></span>
            </a>
            <a className="nav-item nav-link" href="colors">
              Leer de Kleuren
            </a>
            <a className="nav-item nav-link" href="TicTacToe">
              Boter kaas en eieren
            </a>
            <a className="nav-item nav-link" href="Memory">
              Memory
            </a>

            <a className="nav-item nav-link" href="Quiz">
              Quiz
            </a>

            {token ? (
              <a className="nav-item nav-link" href="QuizDashboard">
                Quiz Dashboard
              </a>
            ) : null}

            {gebruikerToken ? (
              <Avatar
                alt={gebruiker.userName.toUpperCase()}
                src="/broken-image.jpg"
                className={classes.orange}
              />
            ) : null}
          </div>

          <div className="login_area_nav">
            <ul>
              {gebruikerToken ? null : (
                <li>
                  <a className="register" href="signUp">
                    Aanmelden
                  </a>
                </li>
              )}

              <li>{gebruikerControls}</li>
              <li>{loginLogoutControls}</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
