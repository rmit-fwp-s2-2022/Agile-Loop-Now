import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../pages/Profile"
import { createUser, deleteUser } from "../data/repository";
import {

    setCurrentUser
  } from "../data/User";
import {BrowserRouter as Router} from 'react-router-dom';

const profileUser = {
    name: "Profile User",
    email: "profileUser@email.com",
    password: "Password12#",
};

beforeAll(async () => {
    await createUser(profileUser);
    setCurrentUser(profileUser);
});

afterAll(async () => {
    await deleteUser(profileUser.email);
});

beforeEach(() => { 
    render(
        <Router>
            <Profile />
        </Router>
    );
});

test("Load user profile", async () => {
    //Page should display "Loading" while user data is being fetched from database
    expect(screen.getByText("Loading")).toBeInTheDocument();

    await waitFor(() => {
        //Page should display User information such as Name, Email
        expect(screen.getByText(profileUser.name)).toBeInTheDocument();
        expect(screen.getByText(profileUser.email)).toBeInTheDocument();
    })
    

})