import { Navigate, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { useRole } from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const { role, roleLoading: isAdminLoading } = useRole();

  const location = useLocation();

  if (loading || isAdminLoading) {
    return <p>Loading...</p>;
  }

  if (currentUser?.user?.email && role === "Admin") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
