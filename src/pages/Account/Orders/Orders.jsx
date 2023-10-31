import { useState } from "react";
import { useGetMyOrdersQuery } from "../../../Redux/order/orderApi";

export default function Orders() {
  const { data, isLoading, isError, error } = useGetMyOrdersQuery();

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((order) => (
      <tr key={order?._id}>
        <td className="py-2 px-4">
          <div className="w-max">
            <p>
              <span className="text-primary">#{order?._id}</span>
            </p>
            <p className="text-xs text-neutral/70">
              Placed on {order?.createdAt}
            </p>
          </div>
        </td>

        <td className="py-2 px-4">
          <div className="flex flex-col gap-1">
            {order?.products?.map((product) => (
              <div className="w-max flex items-center gap-1">
                <img
                  src="https://static-01.daraz.com.bd/p/51bbf8f46780bc334a79dbc386dd35f3.jpg"
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-sm">Hart Hagerty</p>
              </div>
            ))}
          </div>
        </td>

        <td className="py-2 px-4 text-sm">Proccesing</td>
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
              <th className="px-4">Products</th>
              <th className="px-4"> Status</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
}
