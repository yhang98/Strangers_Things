import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api";

const Home = () => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getMyInfo() {
      const myReturnedInfo = await getProfile(token);
      setMyInfo(myReturnedInfo);
    }
    getMyInfo();
  }, []);

  return (
    <div className="Home">
      {localStorage.getItem("loggedIn") ? (
        <>
          <h1 className="homeTitle">Welcome to Stranger's Things</h1>
          {myInfo && myInfo.username ? (
            <h3>{`Logged in as ${myInfo.username}`}</h3>
          ) : null}
          <button
            className="homeButton"
            onClick={() => {
              navigate("/Profile");
            }}
          >
            VIEW PROFILE
          </button>
        </>
      ) : (
        <>
          <h1 className="homeTitle">Welcome to Stranger's Things</h1>
          <button
            className="homeButton"
            onClick={() => {
              navigate("/");
            }}
          >
            PLEASE LOGIN
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
