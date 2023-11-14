import { useGetAllOrdersQuery } from "../../../Redux/order/orderApi";
import { useGetProductsQuery } from "../../../Redux/product/productApi";
import { useAllUsersQuery } from "../../../Redux/user/userApi";

export default function Dashboard() {
  const { data: products } = useGetProductsQuery({});
  const { data: users } = useAllUsersQuery({});
  const { data: orders } = useGetAllOrdersQuery({});

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="border rounded p-4">
          <p>Total Products : {products?.data?.length}</p>
        </div>
        <div className="border rounded p-4">
          <p>Total Users : {users?.data?.length}</p>
        </div>
        <div className="border rounded p-4">
          <p>Total Orders : {orders?.data?.length}</p>
        </div>
      </div>
    </div>
  );
}
