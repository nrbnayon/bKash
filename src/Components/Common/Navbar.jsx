import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Logo from "../../assets/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../Redux/Reducers/User/userSlice";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useRole } from "../../hooks/useRole";
const Navbar = () => {
  const { role } = useRole();
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();

  const handleLogout = async () => {
    try {
      const response = await axiosPublic.post("/api/user/signout");
      if (response.status !== 200) {
        toast.warn("Logout failed");
      }
    } catch (error) {
      toast.warn("Logout error:", error);
    } finally {
      toast.success("Logout Success");
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <div className="navbar bg-[#e2136e]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <AiOutlineMenuUnfold className="w-5 h-5 text-white text-lg font-bold" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {role === "User" && (
              <>
                <li>
                  <NavLink to="/user/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/user/transactions">Transactions</NavLink>
                </li>
              </>
            )}
            {role === "Agent" && (
              <>
                <li>
                  <NavLink to="/agent/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/agent/transactions">Transactions</NavLink>
                </li>
              </>
            )}
            {role === "Admin" && (
              <>
                <li>
                  <NavLink to="/admin/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/users">Users</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/transactions">Transactions</NavLink>
                </li>
              </>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="text-white text-lg font-bold hover:text-gray-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="w-28 h-16">
          <img src={Logo} alt="bKash" className="w-full h-full" />
        </div>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {role === "User" && (
            <>
              <li>
                <NavLink
                  to="/user/dashboard"
                  className="text-white text-lg font-bold hover:text-gray-200"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/transactions"
                  className="text-white text-lg font-bold hover:text-gray-200"
                >
                  Transactions
                </NavLink>
              </li>
            </>
          )}
          {role === "Agent" && (
            <>
              <li>
                <NavLink
                  to="/agent/dashboard"
                  className="text-white text-lg font-bold hover:text-gray-200"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/agent/transactions"
                  className="text-white text-lg font-bold hover:text-gray-200"
                >
                  Transactions
                </NavLink>
              </li>
            </>
          )}
          {role === "Admin" && (
            <>
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className="text-white text-lg font-bold hover:text-gray-200"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/users"
                  className="text-white text-lg font-bold hover:text-gray-200"
                >
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/transactions"
                  className="text-white text-lg font-bold hover:text-gray-200"
                >
                  Transactions
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {currentUser ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white text-lg font-bold"
            >
              Profile
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                <div className="p-4 border-b">
                  <p className="font-bold">{currentUser.user.username}</p>
                  <p className="text-sm">{currentUser.user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-sm bg-white text-blue-500"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-sm bg-white text-blue-500 ml-2"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
