import { useGetAllOrdersQuery } from "../../../Redux/order/orderApi";
import { useGetAllProductsQuery } from "../../../Redux/product/productApi";
import {
  useAllAdministratorQuery,
  useAllUsersQuery,
} from "../../../Redux/user/userApi";

import { FaBoxOpen, FaUsers, FaUserShield, FaCartPlus } from "react-icons/fa";

export default function Dashboard() {
  const { data: products } = useGetAllProductsQuery({});
  const { data: orders } = useGetAllOrdersQuery({});
  const { data: users } = useAllUsersQuery({});
  const { data: admin } = useAllAdministratorQuery({});

  return (
    <section>
      {/* card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Products</p>
            <h3 className="text-primary font-bold">{products?.data?.length}</h3>
          </div>
          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaBoxOpen className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Orders</p>
            <h3 className="text-red-600 font-bold">{orders?.data?.length}</h3>
          </div>

          <div className="bg-red-600 text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaCartPlus className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Users</p>
            <h3 className="text-green-600 font-bold">{users?.data?.length}</h3>
          </div>

          <div className="bg-green-600 text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaUsers className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Administrators</p>
            <h3 className="text-green-600 font-bold">{admin?.data?.length}</h3>
          </div>

          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaUserShield className="text-xl" />
          </div>
        </div>
      </div>

      <div className="mt-4 bg-base-100 p-4 rounded shadow">
        <p>Latest Orders</p>
      </div>
    </section>
  );
}
