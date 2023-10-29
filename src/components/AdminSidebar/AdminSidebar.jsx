import { Link, NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

export default function AdminSidebar() {
  return (
    <div className="p-6">
      <Link to="/admin/dashboard" className="block border-b pb-4">
        <img src="/images/logo/logo.png" alt="" className="w-24 mx-auto" />
      </Link>

      <nav className="admin_siderbar mt-6">
        <ul>
          <li>
            <NavLink to="/admin/dashboard">
              <RxDashboard />
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
