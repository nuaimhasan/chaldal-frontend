import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../../Redux/order/orderApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function AllOrders() {
  const { data, isLoading, isError, error } = useGetAllOrdersQuery();

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((order) => (
      <tr key={order?.id}>
        <td>{order?.id}</td>
        <td>{order?.products?.length}</td>
        <td>{order?.status}</td>
        <td>
          <Link
            to={`/admin/order/${order?.id}`}
            className="flex gap-1 items-center hover:text-green-700 duration-300"
          >
            <GrView />
            Details
          </Link>
        </td>
      </tr>
    ));
  }

  return (
    <div className="relative overflow-x-auto shadow-lg">
      <table className="dashboard_table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Total Products</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
