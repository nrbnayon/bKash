import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "./../Pages/Home/Home";
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
    ],
  },
]);
