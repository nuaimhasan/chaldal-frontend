import { Navigate, useLocation } from "react-router-dom";
import { UseContext } from "../ContextApi/ContextApi";
import Spinner from "../components/Spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const { loggedUser, loading } = UseContext();
  const location = useLocation();

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (!loggedUser?.success && !loading && loggedUser === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success) {
    return children;
  }
};

export default PrivateRoute;
