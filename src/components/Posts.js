import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, getUserPosts } from "../api";

const Posts = ({ singlePost, setSinglePost }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [person, setPerson] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      const returnPosts = await getPosts();
      setAllPosts(returnPosts);
    }
    fetchPosts();

    async function fetchPerson() {
      const token = localStorage.getItem("token");
      const returnProfile = await getUserPosts(token);
      setPerson(returnProfile);
    }
    fetchPerson();
  }, []);

  const postMatches = (posts, text) => {
    if (posts.title.toLowerCase().includes(text)) {
      return true;
    } else if (posts.description.toLowerCase().includes(text)) {
      return true;
    } else if (posts.author.username.toLowerCase().includes(text)) {
      return true;
    } else if (posts.location.toLowerCase().includes(text)) {
      return true;
    } else if (posts.price.toLowerCase().includes(text)) {
      return true;
    } else {
      return null;
    }
  };

  const filteredPosts = allPosts.filter((post) =>
    postMatches(post, searchTerm)
  );
  const postsToDisplay = searchTerm.length ? filteredPosts : allPosts;

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    postMatches();
    setSearchTerm(postsToDisplay);
  };

  const catchId = (Id) => {
    setSinglePost(Id);
    return singlePost;
  };

  return (
    <div className="posts">
      {localStorage.getItem("loggedIn") ? (
        <>
          <div className="postsTitle">
            <h1 className="homeTitle">Posts</h1>
            <form>
              <input
                className="searchBar"
                type="text"
                placeholder="Search"
                onChange={handleChange}
              ></input>
            </form>
            <button
              className="postButton"
              onClick={() => {
                navigate("/Add");
              }}
            >
              Add Post
            </button>
          </div>
          {allPosts.length
            ? postsToDisplay.map((post, index) => {
                return (
                  <div key={index} className="allPosts">
                    <h2>{post.title}</h2>
                    <div className="postInfo">
                      <b>Description: </b>
                      {post.description}
                    </div>
                    <div className="postInfo">
                      <b>Price:</b> {post.price}
                    </div>
                    <div className="postInfo">
                      <b>Seller:</b> {post.author.username}
                    </div>
                    <div className="postInfo">
                      <b>Location:</b> {post.location}
                    </div>
                    {post.author._id === person._id ? (
                      <button
                        className="postButton"
                        onClick={() => {
                          catchId(post._id);
                          navigate(`/UserPost`);
                        }}
                      >
                        View
                      </button>
                    ) : (
                      <button
                        className="postButton"
                        onClick={() => {
                          catchId(post._id);
                          navigate("/OthersPost");
                        }}
                      >
                        Send Message
                      </button>
                    )}
                  </div>
                );
              })
            : null}
        </>
      ) : (
        <>
          <div className="postsTitle">
            <h1 className="homeTitle">Posts</h1>
            <form>
              <input
                className="searchBar"
                type="text"
                placeholder="Search"
                onChange={handleChange}
              ></input>
            </form>
          </div>
          {allPosts.length
            ? postsToDisplay.map((post, index) => {
                return (
                  <div key={index} className="allPosts">
                    <>
                      <h2>{post.title}</h2>
                      <div className="postInfo">
                        <b>Description: </b>
                        {post.description}
                      </div>
                      <div className="postInfo">
                        <b>Price:</b> {post.price}
                      </div>
                      <div className="postInfo">
                        <b>Seller:</b> {post.author.username}
                      </div>
                      <div className="postInfo">
                        <b>Location:</b> {post.location}
                      </div>
                    </>
                  </div>
                );
              })
            : null}
        </>
      )}
    </div>
  );
};

export default Posts;
