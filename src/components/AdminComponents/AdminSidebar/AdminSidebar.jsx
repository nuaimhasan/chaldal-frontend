import { Link } from "react-router-dom";
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdMonitor,
  MdOutlineSettings,
} from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import SidebarItems from "./SidebarItems";
import { useGetMainLogoQuery } from "../../../Redux/logo/logoApi";
import { VscPreview } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";

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
    icon: <SiBrandfolder />,
    title: "Brand",
    path: "/admin/brands",
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
    icon: <VscPreview />,
    title: "Review",
    path: "/admin/reviews",
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
    icon: <RiAdminFill />,
    title: "Administrator",
    subMenu: [
      {
        title: "All Administrator",
        path: "/admin/administrator/all-administrator",
      },
    ],
  },
  {
    icon: <MdOutlineSettings />,
    title: "E-commerce Setting",
    subMenu: [
      {
        title: "Coupon",
        path: "/admin/ecommerce-setting/coupons",
      },
      {
        title: "Banner",
        path: "/admin/ecommerce-setting/banner",
      },
      {
        title: "Campaign Banner",
        path: "/admin/ecommerce-setting/campaign-banner",
      },
    ],
  },
  {
    icon: <IoMdSettings />,
    title: "General Setting",
    slug: "general-setting",
    subMenu: [
      {
        title: "Profile",
        path: "/admin/general-setting/profile",
      },
      {
        title: "Business Info",
        path: "/admin/general-setting/business-info",
      },
      {
        title: "Themes",
        path: "/admin/general-setting/themes",
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
        title: "Favicon",
        path: "/admin/front-end/favicon",
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
        <Link
          to="/"
          target="_blank"
          className="text-orange-400 hover:underline"
        >
          Attica-Furniture
        </Link>
      </div>
    </div>
  );
}
