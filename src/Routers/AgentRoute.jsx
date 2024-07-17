import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useRole } from "../hooks/useRole";

const AgentRoute = ({ children }) => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const { role, roleLoading: isAgentLoading } = useRole();

  const location = useLocation();

  if (loading || isAgentLoading) {
    return <p>Loading...</p>;
  }

  if (currentUser?.user?.email && role === "Agent") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

AgentRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AgentRoute;
