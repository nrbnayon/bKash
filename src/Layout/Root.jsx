import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div>
      <div className="h-20">
        <p>Header</p>
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
