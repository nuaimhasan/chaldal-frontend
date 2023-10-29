import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function AdminHeader() {
  return (
    <header className="p-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button>
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>
          <p>Dashboard</p>
        </div>

        <div className="flex items-center gap-3">
          <img src="" alt="" className="w-8 h-8 rounded-full" />
          <p>Full Name</p>
        </div>
      </div>
    </header>
  );
}
