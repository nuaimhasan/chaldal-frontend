import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const AdminRoute = ({ children }) => {
  const { loggedUser } = useSelector((state) => state.user);
  const location = useLocation();
  const token = localStorage.getItem("aesthetic_jwt");

  if (!loggedUser?.success && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loggedUser?.success && loggedUser?.data?.role !== "admin") {
    Swal.fire("", "you can't access this page", "error");
    return <Navigate to="/login" replace />;
  }

  if (loggedUser?.success && loggedUser?.data?.role === "admin") {
    return children;
  }

  return <Spinner></Spinner>;
};

export default AdminRoute;
