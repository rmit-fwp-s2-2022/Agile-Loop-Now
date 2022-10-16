import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../pages/Profile";
import {
  createUser,
  deleteUser,
  findUser,
  updateName,
  verifyUser,
} from "../data/repository";
import { setCurrentUser } from "../data/User";
import { BrowserRouter as Router } from "react-router-dom";

const profileUser = {
  name: "Profile User",
  email: "profileUser@email.com",
  password: "Password12#",
};

beforeEach(async () => {
  await createUser(profileUser);
  setCurrentUser(profileUser);
});

afterEach(async () => {
  await deleteUser(profileUser.email);
});

test("Load user profile", async () => {
  render(
    <Router>
      <Profile
        user={await verifyUser(profileUser.email, profileUser.password)}
      />
    </Router>
  );

  //Page should display "Loading" while user data is being fetched from database
  expect(screen.getByText("Loading")).toBeInTheDocument();

  await waitFor(() => {
    //Page should display User information such as Name, Email
    expect(screen.getByText(profileUser.name)).toBeInTheDocument();
    expect(screen.getByText(profileUser.email)).toBeInTheDocument();
  });
});

test("Edit user details", async () => {
  //Update user name and check if updated name matches with name stored in database
  const newName = profileUser.name + "Edited";
  await updateName(newName, profileUser.email);
  const userName = await findUser(profileUser.email);
  expect(userName.name).toBe(newName);
});
