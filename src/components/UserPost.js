import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost, getUserPosts, modifiedPost, getProfile } from "../api";

const UserPost = ({ singlePost }) => {
  const navigate = useNavigate();
  const [onePost, setOnePost] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [myInfo, setMyInfo] = useState({});

  const [title, setTitle] = useState(onePost.title);
  const [description, setDescription] = useState(onePost.description);
  const [price, setPrice] = useState(onePost.price);
  const [location, setLocation] = useState(onePost.location);

  useEffect(() => {
    async function fetchPosts() {
      const token = localStorage.getItem("token");
      const returnPosts = await getUserPosts(token);
      setOnePost(returnPosts.posts);
    }
    fetchPosts();

    async function getMyInfo() {
      const token = localStorage.getItem("token");
      const myReturnedInfo = await getProfile(token);
      setMyInfo(myReturnedInfo);
    }
    getMyInfo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const postid = singlePost;
    const post = {
      title: title,
      description: description,
      price: price,
      location: location,
    };
    const newPost = await modifiedPost(token, post, postid);
    alert("Post has been Updated!");
    navigate("/Posts");
    return newPost;
  };

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const priceChange = (event) => {
    setPrice(event.target.value);
  };

  const locationChange = (event) => {
    setLocation(event.target.value);
  };

  const deleteUserPost = async () => {
    const token = localStorage.getItem("token");
    const postid = singlePost;
    const erasePost = await deletePost(token, postid);
    alert("Post has been Deleted!");
    navigate("/Posts");
    return erasePost;
  };

  const editFormFunc = (post) => {
    return (
      <form onSubmit={handleSubmit} id="loginForm">
        <div className="boxes">
          <input
            className="input"
            type="text"
            name="title"
            defaultValue={post.title}
            onChange={titleChange}
          />
          <input
            className="input"
            type="text"
            name="description"
            defaultValue={post.description}
            onChange={descriptionChange}
          />
          <input
            className="input"
            type="text"
            name="price"
            defaultValue={post.price}
            onChange={priceChange}
          />
          <input
            className="input"
            type="text"
            name="location"
            defaultValue={post.location}
            onChange={locationChange}
          />
          <label>
            <input type="checkbox" />
            Willing to Deliver?
          </label>
          <button type="submit">UPDATE</button>
        </div>
      </form>
    );
  };

  return (
    <div>
      {onePost.map((post, index) => {
        if (singlePost === post._id)
          return (
            <div key={index}>
              <>
                <div className="allPosts">
                  <h2>{post.title}</h2>
                  <div className="postInfo">
                    <b>Description: </b>
                    {post.description}
                  </div>
                  <div className="postInfo">
                    <b>Price:</b> {post.price}
                  </div>
                  <div className="postInfo">
                    <b>Location:</b> {post.location}
                  </div>
                </div>
                <button
                  className="messageButton"
                  onClick={() => {
                    setEditForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="deleteButton"
                  onClick={() => {
                    deleteUserPost();
                  }}
                >
                  Delete
                </button>
              </>
              <div>{editForm ? editFormFunc(post) : null}</div>
              <h3>Messages regarding post here:</h3>
              <div>
                {myInfo.data
                  ? myInfo.data.messages.map((message, index) => {
                      return myInfo.data.username !==
                        message.fromUser.username &&
                        message.post._id === singlePost ? (
                        <div key={index} className="allPosts">
                          <div className="postInfo">
                            <b>
                              <u>{message.fromUser.username}</u>
                            </b>
                          </div>
                          <div className="postInfo">{message.content}</div>
                        </div>
                      ) : null;
                    })
                  : null}
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default UserPost;
