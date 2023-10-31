import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import AboutUs from "../pages/AboutUs/AboutUs";
import FAQ from "../pages/FAQ/FAQ";
import AccountLayout from "../Layout/AccountLayout";
import Profile from "../pages/Account/Profile/Profile";
import EditePeofile from "../pages/Account/EditePeofile/EditePeofile";
import Wishlist from "../pages/Account/Wishlist/Wishlist";
import Orders from "../pages/Account/Orders/Orders";
import Setting from "../pages/Account/Setting/Setting";
import Cart from "../pages/Cart/Cart";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ProductList from "../pages/Admin/Product/ProductList";
import AddProduct from "../pages/Admin/Product/AddProduct";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

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
        path: "/shops/:slug",
        element: <Shop />,
      },
      {
        path: "/product/:slug/:id",
        element: <ProductDetails />,
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
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/",
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
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/product/product-list",
        element: <ProductList />,
      },
      {
        path: "/admin/product/add-product",
        element: <AddProduct />,
      },
    ],
  },
]);
