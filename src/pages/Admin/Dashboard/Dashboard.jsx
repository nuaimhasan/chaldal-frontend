import { useGetAllOrdersQuery } from "../../../Redux/order/orderApi";
import { useGetProductsQuery } from "../../../Redux/product/productApi";
import { useAllUsersQuery } from "../../../Redux/user/userApi";
import { BsCart4 } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";

export default function Dashboard() {
  const { data: products } = useGetProductsQuery({});
  const { data: users } = useAllUsersQuery({});
  const { data: orders } = useGetAllOrdersQuery({});

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="shadow rounded p-4 bg-base-100">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Products</h3>
              <p className="text-primary text-lg">{products?.data?.length}</p>
            </div>
            <div>
              <BsCart4 className="text-2xl text-neutral-content" />
            </div>
          </div>
        </div>
        <div className="shadow rounded p-4 bg-base-100">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Customers</h3>
              <p className="text-primary text-lg">{users?.data?.length}</p>
            </div>
            <div>
              <FaUsers className="text-2xl text-neutral-content" />
            </div>
          </div>
        </div>
        <div className="shadow rounded p-4 bg-base-100">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg">Total Orders</h3>
              <p className="text-primary text-lg">{orders?.data?.length}</p>
            </div>
            <div>
              <FaBagShopping className="text-[22px] text-neutral-content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
