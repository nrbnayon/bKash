import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Common/Navbar";

const Root = () => {
  return (
    <div>
      <div className="h-20">
        <Navbar />
      </div>
      <div className="h-screen">
        <Outlet />
      </div>
      <div>
        <p>Footer</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Root;
