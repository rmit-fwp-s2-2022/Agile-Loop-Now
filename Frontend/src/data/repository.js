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
  const response = await axios.get(API_HOST + "/api/posts");
  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

// --- Follow ---------------------------------------------------------------------------------------
async function getUserFollows(user) {
  const response = await axios.get(API_HOST + `/api/follows/getUser/${user}`);
  return response.data;
}

async function loadUsersWithFollowers(user) {
  const users = await axios.get(API_HOST + "/api/users");
  const followers = await getUserFollows(user);
  let following = [];
  for (const user of users.data){
    let u = {
      email: user.email,
      name: user.name,
      following: false,
      follow_id: null
    }
    for (const follow of followers){
      if (follow.follower_email === user.email){
        u.following = true;
        u.follow_id = follow.id;
        break;
      }
    }
    following.push(u);
  }

  return following;
}

async function isFollowing(user_email, follower_email) {
  let data = null;
  await axios
    .get("http://localhost:4000/api/follows/isfollowing", {
      params: { user_email: "test@mail.com", follower_email: "asd@asd.com" },
    })
    .then((response) => {
      data = response.data;
    });

  return data;
}

async function createFollow(follow) {
  const response = await axios.post(API_HOST + "/api/follows/follow", follow);
  return response.data;
}

async function deleteFollow(id) {
  const response = await axios.delete(API_HOST + `/api/follows/unfollow/${id}`);
  return response.data;
}

export {
  verifyUser,
  findUser,
  createUser,
  getPosts,
  createPost,
  updateName,
  updateEmail,
  deleteUser,
  loadUsersWithFollowers,
  isFollowing,
  createFollow,
  deleteFollow
};
