import { Navigate, useLocation } from "react-router-dom";
import { UseContext } from "../ContextApi/ContextApi";
import Spinner from "../components/Spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const { loggedUser, loading } = UseContext();
  const location = useLocation();

  const token = localStorage.getItem("eshop_jwt");

  if (!loggedUser?.success && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success && token) {
    return children;
  }

  return <Spinner></Spinner>;
};

export default PrivateRoute;
