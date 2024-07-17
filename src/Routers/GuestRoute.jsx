import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const GuestRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser?.user?.email) {
    return <Navigate to="/" />;
  }
  return children;
};

GuestRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuestRoute;
