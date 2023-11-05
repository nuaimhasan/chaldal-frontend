import { Link, NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoCreateOutline } from "react-icons/io5";
import { FaRegWindowRestore } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";

export default function AdminSidebar() {
  return (
    <div className="p-6">
      <Link to="/" className="block border-b pb-4">
        <img src="/images/logo/logo.png" alt="" className="w-24 mx-auto" />
      </Link>

      <nav className="admin_siderbar mt-6">
        <div>
          <ul>
            <li>
              <NavLink to="/admin/dashboard">
                <RxDashboard />
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>Products</h3>
          <ul className="pl-4">
            <li>
              <NavLink to="/admin/product/add-product">
                <IoCreateOutline className="text-lg" />
                Add Product
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/product/product-list">
                <FaRegWindowRestore />
                Product List
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>Users</h3>
          <ul className="pl-4">
            <li>
              <NavLink to="/admin/user/all-users">
                <FiUsers className="text-lg" />
                User List
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>Orders</h3>
          <ul className="pl-4">
            <li>
              <NavLink to="/admin/order/all-order">
                <IoBagCheckOutline className="text-lg" />
                Order List
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
