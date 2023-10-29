import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useLocation } from "react-router-dom";

export default function AdminHeader({ setSidebar }) {
  const { pathname } = useLocation();

  return (
    <header className="px-3 py-2 rounded bg-primary text-base-100">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebar(true)}
            className="admin_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>
          <div className="flex items-center text-[15px]">
            <p>Dashboard</p>
            {pathname !== "/admin/dashboard" && (
              <p className="hidden sm:block">{pathname}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img src="" alt="" className="w-8 h-8 rounded-full" />
          <p className="hidden sm:block">Full Name</p>
        </div>
      </div>
    </header>
  );
}
