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

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashbaord",
    path: "/admin/dashboard",
  },
  {
    icon: <MdOutlineCategory />,
    title: "Categories",
    subMenu: [
      {
        title: "Category",
        path: "/admin/category/categories",
      },
    ],
  },
  {
    icon: <BsCart4 />,
    title: "Products",
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
    title: "Orders",
    subMenu: [
      {
        title: "All Order",
        path: "/admin/order/all-orders",
      },
    ],
  },
  {
    icon: <FaUsers />,
    title: "Customer",
    subMenu: [
      {
        title: "All Customer",
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
        path: "/admin/front-end/home-page/logo",
      },
      {
        title: "Home Page",
        subSubMenu: [
          {
            title: "Banner",
            path: "/admin/front-end/home-page/banner",
          },
        ],
      },
      {
        title: "About Us",
        path: "/admin/front-end/about-us/about",
      },
      {
        title: "Contact Us",
        path: "/admin/front-end/contact-us/contact",
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
];

export default function AdminSidebar() {
  return (
    <div className="py-6">
      <Link to="/" className="block border-b pb-4">
        <img
          src="/images/logo/logo_withoutbg.png"
          alt=""
          className="w-28 mx-auto"
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
  );
}
