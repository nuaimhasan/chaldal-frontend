import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AboutUs from "../pages/AboutUs/AboutUs";
import FAQ from "../pages/FAQ/FAQ";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Cart from "../pages/Cart/Cart";

import PrivateRoute from "../PrivateRoute/PrivateRoute";

import Checkout from "../pages/Checkout/Checkout";

import AccountLayout from "../Layout/AccountLayout";
import Profile from "../pages/Account/Profile/Profile";
import EditePeofile from "../pages/Account/EditePeofile/EditePeofile";
import Wishlist from "../pages/Account/Wishlist/Wishlist";
import Orders from "../pages/Account/Orders/Orders";
import Setting from "../pages/Account/Setting/Setting";

import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ProductList from "../pages/Admin/Product/ProductList";
import AddProduct from "../pages/Admin/Product/AddProduct";

import EditProduct from "../pages/Admin/Product/EditProduct";
import AllUsers from "../pages/Admin/user/AllUsers";
import AllOrders from "../pages/Admin/Order/AllOrders";
import OrderDetails from "../pages/Admin/Order/OrderDetails";
import Categories from "../pages/Admin/Categories/Categories";
import Editcategory from "../pages/Admin/Categories/Editcategory/Editcategory";
import AdminRoute from "../PrivateRoute/AdminRoute";
import Logo from "../pages/Admin/Logo/Logo";
import About from "../pages/Admin/About/About";
import Contact from "../pages/Admin/Contact/Contact";
import Banner from "../pages/Admin/Home/Banner/Banner";
import AddBanner from "../pages/Admin/Home/Banner/AddBanner";
import Administrator from "../pages/Admin/Administrator/Administrator";
import AddAdministrator from "../pages/Admin/Administrator/AddAdministrator";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shops",
        element: <Shop />,
      },
      {
        path: "/shops/:category",
        element: <Shop />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/account",
    element: (
      <PrivateRoute>
        <AccountLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/account/profile",
        element: <Profile />,
      },
      {
        path: "/account/profile/edite",
        element: <EditePeofile />,
      },
      {
        path: "/account/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/account/orders",
        element: <Orders />,
      },
      {
        path: "/account/setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/category/categories",
        element: <Categories />,
      },
      {
        path: "/admin/category/edit/:id",
        element: <Editcategory />,
      },
      {
        path: "/admin/product/all-products",
        element: <ProductList />,
      },
      {
        path: "/admin/product/add-product",
        element: <AddProduct />,
      },
      {
        path: "/admin/product/edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "/admin/order/all-orders",
        element: <AllOrders />,
      },
      {
        path: "/admin/order/:id",
        element: <OrderDetails />,
      },
      {
        path: "/admin/customer/all-customers",
        element: <AllUsers />,
      },
      {
        path: "/admin/front-end/logo",
        element: <Logo />,
      },
      {
        path: "/admin/front-end/about-us",
        element: <About />,
      },
      {
        path: "/admin/front-end/contact-us",
        element: <Contact />,
      },
      {
        path: "/admin/front-end/home-page/banner",
        element: <Banner />,
      },
      {
        path: "/admin/front-end/home-page/add-banner",
        element: <AddBanner />,
      },
      {
        path: "/admin/administrator/all-administrator",
        element: <Administrator />,
      },
      {
        path: "/admin/administrator/add-administrator",
        element: <AddAdministrator />,
      },
    ],
  },
]);
