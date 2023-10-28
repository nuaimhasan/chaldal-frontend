import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "./../Hooks/useAdmin";
import Spinner from "../components/Spinner/Spinner";
import { UseContext } from "../ContextApi/ContextApi";

const AdminRoute = ({ children }) => {
  const { loggedUser, loading } = UseContext();
  const [isAdmin] = useAdmin(user?.email);
  const location = useLocation();

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (loggedUser?.success && !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
