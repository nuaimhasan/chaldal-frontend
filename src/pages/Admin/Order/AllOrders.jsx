import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import { useGetAllOrdersQuery } from "../../../Redux/order/orderApi";
import { GrView } from "react-icons/gr";

export default function AllOrders() {
  const { data, isLoading, isError, error } = useGetAllOrdersQuery();
  console.log(data?.data);
  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((order) => (
      <tr key={order?.uuid}>
        <td>{order?.uuid}</td>
        <td>Items: {order?.products?.length}</td>
        <td>
          {order?.sippingAddress?.street}, {order?.sippingAddress?.district},{" "}
          {order?.sippingAddress?.city}
        </td>
        <td>
          <Link
            to={`/admin/order/${order?.uuid}`}
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
            <th>Products</th>
            <th>Shipping Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
