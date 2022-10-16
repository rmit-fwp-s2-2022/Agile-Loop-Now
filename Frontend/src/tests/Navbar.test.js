import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";

test("Navbar render test", async () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const navbar = screen.getByTestId("navbar");
  expect(navbar).toBeTruthy();
});
