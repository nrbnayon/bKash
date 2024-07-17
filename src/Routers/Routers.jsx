import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "./../Pages/Home/Home";
import RegisterPage from "../Pages/Auth/Register";
import LoginPage from "../Pages/Auth/Login";
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
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
