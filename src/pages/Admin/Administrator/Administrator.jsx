import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAllAdministratorQuery,
  useDeleteAdministratorMutation,
} from "../../../Redux/user/userApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function Administrator() {
  const { data, isLoading, isError, error } = useAllAdministratorQuery();
  const [
    deleteAdministrator,
    { isSuccess, isError: deleteIsError, error: deleteError },
  ] = useDeleteAdministratorMutation();

  const handleDlete = (id) => {
    const isConfirm = window.confirm("Are you sure delete Administrator");
    if (isConfirm) {
      deleteAdministrator(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Delete Success", "success");
    }
    if (deleteIsError) {
      Swal.fire("", deleteError?.data?.message, "error");
    }
  }, [isSuccess, deleteIsError]);

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((user) => (
      <tr key={user?.id}>
        <td>
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/images/users/${
                user?.image
              }`}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            {user?.firstName} {user?.lastName}
          </div>
        </td>
        <td>{user?.email}</td>
        <td>{user?.phone}</td>
        <td>{user?.role}</td>
        <td>
          <button onClick={() => handleDlete(user?.id)}>
            <AiOutlineDelete className="text-lg hover:text-red-500" />
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <section>
      <div className="flex justify-end mb-2">
        <Link
          to="/admin/administrator/add-administrator"
          className="primary_btn"
        >
          Add Administrator
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-lg">
        <table className="dashboard_table">
          <thead>
            <tr>
              <th>User name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </section>
  );
}
