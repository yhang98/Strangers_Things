import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Posts,
  Register,
  Login,
  Profile,
  Header,
  Home,
  Add,
  UserPost,
  OthersPost,
} from "./";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [singlePost, setSinglePost] = useState("");
  const [newMessage, setNewMessage] = useState("");

  return (
    <div>
      <Header setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route
          path="/Posts"
          element={
            <Posts singlePost={singlePost} setSinglePost={setSinglePost} />
          }
        />
        <Route path="/Add" element={<Add />} />
        <Route
          path="/UserPost"
          element={<UserPost singlePost={singlePost} />}
        />
        <Route
          path="/OthersPost"
          element={
            <OthersPost
              singlePost={singlePost}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
            />
          }
        />
        <Route
          path="/Profile"
          element={<Profile setSinglePost={setSinglePost} />}
        />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default App;