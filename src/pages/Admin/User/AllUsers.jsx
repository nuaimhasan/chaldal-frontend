import Spinner from "../../../components/Spinner/Spinner";
import { useAllCustomersQuery } from "../../../Redux/user/userApi";

export default function AllUsers() {
  const { data, isLoading, isError, error } = useAllCustomersQuery();

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
      </tr>
    ));
  }

  return (
    <div className="relative overflow-x-auto shadow-lg">
      <table className="dashboard_table">
        <thead>
          <tr>
            <th>Customer name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
