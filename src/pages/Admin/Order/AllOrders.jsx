import { AiOutlineDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useStatusUpdateMutation,
} from "../../../Redux/order/orderApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function AllOrders() {
  const { data, isLoading, isError, error } = useGetAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [statusUpdate, { isLoading: statusLoading }] =
    useStatusUpdateMutation();

  // console.log(data?.data);

  const deleteOrderHandler = async (id) => {
    const isConfirm = window.confirm("Do you want to delete this order?");

    try {
      if (isConfirm) {
        const result = await deleteOrder(id);
        if (result?.data?.success) {
          toast.success(result?.data?.message);
        }
      }
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };

  const statusHandler = async (id, status) => {
    const isConfirm = window.confirm("Do you want to update status?");

    if (status === "pending") {
      status = "shipped";
    } else if (status === "shipped") {
      status = "delivered";
    } else {
      status = "pending";
    }

    if (isConfirm) {
      try {
        const result = await statusUpdate({ id, status });
        if (result?.data?.success) {
          toast.success(result?.data?.message);
        }
      } catch (error) {
        toast.error(error?.data?.error);
      }
    }
  };

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((order) => (
      <tr key={order?._id}>
        <td>{order?._id}</td>
        <td>{order?.products?.length}</td>
        <td>
          {statusLoading ? (
            <p>Loading...</p>
          ) : (
            <button
              onClick={() => statusHandler(order?._id, order?.status)}
              disabled={order?.status === "delivered"}
              className={`border text-xs ${
                order?.status === "pending"
                  ? "border-yellow-500"
                  : order?.status === "shipped"
                  ? "border-green-500"
                  : "border-red-500"
              } rounded px-2 py-1`}
            >
              {order?.status === "pending" ? (
                <span className="text-yellow-500">{order?.status}</span>
              ) : order?.status === "shipped" ? (
                <span className="text-green-500">{order?.status}</span>
              ) : (
                <span className="text-red-500">{order?.status}</span>
              )}
            </button>
          )}
        </td>
        <td className="flex gap-3">
          <Link
            to={`/admin/order/${order?._id}`}
            className=" hover:text-blue-700"
          >
            <GrView />
          </Link>
          <button
            onClick={() => deleteOrderHandler(order?._id)}
            className="hover:text-red-700"
          >
            <AiOutlineDelete />
          </button>
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
