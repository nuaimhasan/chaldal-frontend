import { Link } from "react-router-dom";
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdMonitor,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import SidebarItems from "./SidebarItems";
import { useGetMainLogoQuery } from "../../../Redux/logo/logoApi";
import { VscPreview } from "react-icons/vsc";

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashbaord",
    path: "/admin/dashboard",
  },
  {
    icon: <MdOutlineCategory />,
    title: "Category",
    subMenu: [
      {
        title: "Categories",
        path: "/admin/category/categories",
      },
      {
        title: "Sub Categories",
        path: "/admin/category/sub-categories",
      },
      {
        title: "Sub SubCategories",
        path: "/admin/category/sub-sub-categories",
      },
    ],
  },
  {
    icon: <BsCart4 />,
    title: "Product",
    subMenu: [
      {
        title: "Add New Product",
        path: "/admin/product/add-product",
      },
      {
        title: "All Products",
        path: "/admin/product/all-products",
      },
    ],
  },
  {
    icon: <BiSolidShoppingBags />,
    title: "Order",
    subMenu: [
      {
        title: "All Orders",
        path: "/admin/order/all-orders",
      },
    ],
  },
  {
    icon: <FaUsers />,
    title: "Customer",
    subMenu: [
      {
        title: "All Customers",
        path: "/admin/customer/all-customers",
      },
    ],
  },
  {
    icon: <MdMonitor />,
    title: "Front-End Setting",
    subMenu: [
      {
        title: "Logo",
        path: "/admin/front-end/logo",
      },
      {
        title: "Banner",
        path: "/admin/front-end/banner",
      },
      {
        title: "About Us",
        path: "/admin/front-end/about-us",
      },
      {
        title: "Contact Us",
        path: "/admin/front-end/contact-us",
      },
    ],
  },
  {
    icon: <VscPreview />,
    title: "Review",
    path: "/admin/reviews",
  },
  {
    icon: <RiAdminFill />,
    title: "Administrator",
    subMenu: [
      {
        title: "All Administrator",
        path: "/admin/administrator/all-administrator",
      },
    ],
  },
];

export default function AdminSidebar() {
  const { data } = useGetMainLogoQuery();
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <Link to="/admin/dashboard" className="block border-b py-4">
          <img
            src={
              data?.data[0]?.logo === null
                ? "/images/logo/logo.png"
                : `${import.meta.env.VITE_BACKEND_URL}/logo/${
                    data?.data[0]?.logo
                  }`
            }
            alt=""
            className="w-28 mx-auto h-16"
          />
        </Link>

        <nav className="admin_siderbar">
          <ul>
            {adminSidebarItems?.map((item, i) => (
              <SidebarItems key={i} item={item} />
            ))}
          </ul>
        </nav>
      </div>

      <div className="bg-[#445360] p-2 flex justify-between items-center font-light">
        <p>Visit Front-End</p>
        <Link to="/" className="text-primary hover:underline">
          Eshop
        </Link>
      </div>
    </div>
  );
}
