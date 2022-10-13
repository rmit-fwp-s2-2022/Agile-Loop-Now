import axios from "axios";

//The code below is taken from Lectorial code archive week 8
//Writen by Shekhar Kalra

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { email, password },
  });
  const user = response.data;
  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);
  return response.data;
}

async function findUserName(email) {
  const response = await axios.get(API_HOST + `/api/users/select/${email}`);
  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);
  return response.data;
}

async function updateName(name, email) {
  const response = await axios.put(
    API_HOST + `/api/users/updatename/${email}`,
    { name: name }
  );

  return response.data;
}

async function updateEmail(email, newEmail) {
  const response = await axios.put(
    API_HOST + `/api/users/updateEmail/${email}`,
    { newEmail: newEmail }
  );

  return response.data;
}

async function deleteUser(email) {
  const response = await axios.delete(API_HOST + `/api/users/delete/${email}`);

  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const posts = await axios.get(API_HOST + "/api/posts");
  const users = await axios.get(API_HOST + "/api/users");

  console.log(users.data);
  for (let i = 0; i < posts.data.length; i++) {
    for (let j = 0; j < users.data.length; j++) {
      if (users.data[j].email === posts.data[i].userEmail) {
        posts.data[i].name = users.data[j].name;
      }
    }
  }
  return posts.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts/create", post);
  return response.data;
}

async function deletePost(id) {
  const response = await axios.delete(API_HOST + `/api/posts/delete/${id}`);
  return response.data;
}

export {
  verifyUser,
  findUser,
  createUser,
  getPosts,
  createPost,
  deletePost,
  updateName,
  updateEmail,
  deleteUser,
};
