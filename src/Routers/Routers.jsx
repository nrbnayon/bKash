import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "./../Pages/Home/Home";
import RegisterPage from "../Pages/Auth/Register";
import LoginPage from "../Pages/Auth/Login";
import GuestRoute from "./GuestRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Not Found</p>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },
      {
        path: "login",
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
    ],
  },
]);
