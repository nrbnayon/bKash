import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Logo from "../../assets/logo.jpg";
import PropTypes from "prop-types";

const Navbar = ({ role = "user", handleLogout }) => {
  const navigate = useNavigate();

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
            {role === "user" && (
              <>
                <li>
                  <NavLink to="/user/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/user/transactions">Transactions</NavLink>
                </li>
              </>
            )}
            {role === "agent" && (
              <>
                <li>
                  <NavLink to="/agent/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/agent/transactions">Transactions</NavLink>
                </li>
              </>
            )}
            {role === "admin" && (
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
                onClick={() => {
                  handleLogout();
                  navigate("/login");
                }}
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
          {role === "user" && (
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
          {role === "agent" && (
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
          {role === "admin" && (
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
      </div>
    </div>
  );
};

Navbar.propTypes = {
  role: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  role: "user",
};

export default Navbar;
