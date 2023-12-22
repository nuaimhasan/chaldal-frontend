import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../../../Redux/order/orderApi";
import { Link } from "react-router-dom";

export default function Orders() {
  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser?.data?.id;
  console.log(userId);
  const { data, isLoading, isError, error } = useGetMyOrdersQuery(userId);
  console.log(data?.data?.orders);

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError) {
    content = data?.data?.orders?.map((order) => (
      <tr key={order?.id}>
        <td className="py-2 px-4">
          <div className="w-max">
            <Link to={`/account/orders/${order?.id}`}>
              <span className="text-primary">#{order?.id}</span>
            </Link>
            <p className="text-xs text-neutral/70">
              Placed on {order?.createdAt}
            </p>
          </div>
        </td>

        <td className="py-2 px-4">
          <div className="flex flex-col gap-1">{order?.products?.length}</div>
        </td>

        <td className="py-2 px-4 text-sm">{order?.status}</td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="border-b pb-1 mb-3">
        <h3>All Orders</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4">Order Id</th>
              <th className="px-4">Total items</th>
              <th className="px-4"> Status</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
}
