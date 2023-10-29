import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";

export default function AdminLayout() {
  return (
    <>
      <section>
        <div className="flex gap-5">
          <aside className="admin_sidebar">
            <AdminSidebar />
          </aside>
          <main className="admin_content">
            <AdminHeader />
            <Outlet />
          </main>
        </div>
      </section>
    </>
  );
}
