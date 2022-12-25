import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ setLoggedIn }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  return (
    <div className="header">
      {localStorage.getItem("loggedIn") ? (
        <>
          <Link className="titleMain" to="/Home">
            Stranger's Things
          </Link>
          <Link className="navButton" to="/Posts">
            POSTS
          </Link>
          <Link className="navButton" to="/Profile">
            PROFILE
          </Link>
          <Link
            className="navButton"
            to="/"
            onClick={() => {
              localStorage.clear();
              setLoggedIn(false);
              setUserLoggedIn(false);
            }}
          >
            LOG OUT
          </Link>
        </>
      ) : !localStorage.getItem("loggedIn") ? (
        <>
          <Link className="titleMain" to="/Home">
            Stranger's Things
          </Link>
          <Link className="navButton" to="/Posts">
            POSTS
          </Link>
          <Link className="navButton" to="/">
            LOGIN
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default Header;