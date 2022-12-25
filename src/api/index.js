const BASEURL = "https://strangers-things.herokuapp.com/api/2209-FTB-PT-WEB-PT";

export async function getPosts() {
  const response = await fetch(`${BASEURL}/posts`);
  const result = await response.json();
  const posts = result.data.posts;
  return posts;
}

export async function registerPerson(event) {
  const username = event.target[0].value;
  const password = event.target[1].value;

  const response = await fetch(`${BASEURL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  });
  const result = await response.json();
  const token = result.data.token;
  localStorage.setItem("token", token);
}

export async function confirmLogin(username, password) {
  const response = await fetch(`${BASEURL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  });
  const result = await response.json();
  const token = result.data.token;
  return token;
}

export async function getProfile(token) {
  const response = await fetch(`${BASEURL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  const profile = result;
  return profile;
}

export async function getUserPosts(token) {
  const response = await fetch(`${BASEURL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  const profile = result.data;
  return profile;
}

export async function modifiedPost(token, post, postid) {
  const response = await fetch(`${BASEURL}/posts/${postid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: post,
    }),
  });
  const result = await response.json();
  return result;
}

export async function deletePost(token, postid) {
  const response = await fetch(`${BASEURL}/posts/${postid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
}

export async function addMessage(token, postid, message) {
  const response = await fetch(`${BASEURL}/posts/${postid}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: {
        content: message,
      },
    }),
  });
  const result = await response.json();
  return result;
}

export async function newUserPost(token, post) {
  const response = await fetch(`${BASEURL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: post,
    }),
  });
  const result = await response.json();
  const newPost = result.data.posts;
  return newPost;
}