import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useSelector((state) => state.user);

  const location = useLocation();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (currentUser?.user?.email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
