import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AboutUs from "../pages/AboutUs/AboutUs";
import Cart from "../pages/Cart/Cart";
import FAQ from "../pages/FAQ/FAQ";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Shop from "../pages/Shop/Shop";
import Signup from "../pages/Signup/Signup";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Checkout from "../pages/Checkout/Checkout";
import AccountLayout from "../Layout/AccountLayout";
import EditePeofile from "../pages/Account/EditePeofile/EditePeofile";
import Orders from "../pages/Account/Orders/Orders";
import Profile from "../pages/Account/Profile/Profile";
import Setting from "../pages/Account/Setting/Setting";
import Wishlist from "../pages/Account/Wishlist/Wishlist";

import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AddProduct from "../pages/Admin/Product/AddProduct";
import ProductList from "../pages/Admin/Product/ProductList";

import AdminRoute from "../PrivateRoute/AdminRoute";
import About from "../pages/Admin/About/About";
import AddAdministrator from "../pages/Admin/Administrator/AddAdministrator";
import Administrator from "../pages/Admin/Administrator/Administrator";
import Contact from "../pages/Admin/Contact/Contact";
import Banner from "../pages/Admin/Banner/Banner";
import AddBanner from "../pages/Admin/Banner/AddBanner";
import Logo from "../pages/Admin/Logo/Logo";
import AllOrders from "../pages/Admin/Order/AllOrders";
import OrderDetails from "../pages/Admin/Order/OrderDetails";
import EditProduct from "../pages/Admin/Product/EditProduct";
import AllUsers from "../pages/Admin/user/AllUsers";
import OrderDetailsPage from "../pages/Account/OrderDetails/OrderDetails";

import AllCategories from "../pages/Admin/Category/Categories/AllCategories";
import AddCategory from "../pages/Admin/Category/Categories/AddCategory";
import EditCategory from "../pages/Admin/Category/Categories/EditCategory";
import AllSubCategories from "../pages/Admin/Category/SubCategories/AllSubCategories";
import AddSubCategory from "../pages/Admin/Category/SubCategories/AddSubCategory";
import EditSubCategory from "../pages/Admin/Category/SubCategories/EditSubCategory";
import AllSubSubCategory from "../pages/Admin/Category/SubSubCategory/AllSubSubCategory";
import AddSubSubCategory from "../pages/Admin/Category/SubSubCategory/AddSubSubCategory";
import EditSubSubCategory from "../pages/Admin/Category/SubSubCategory/EditSubSubCategory";

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
        path: "/account/orders/:id",
        element: <OrderDetailsPage />,
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
        element: <AllCategories />,
      },
      {
        path: "/admin/category/add-category",
        element: <AddCategory />,
      },
      {
        path: "/admin/category/edit/:id",
        element: <EditCategory />,
      },
      {
        path: "/admin/category/sub-categories",
        element: <AllSubCategories />,
      },
      {
        path: "/admin/category/add-sub-category",
        element: <AddSubCategory />,
      },
      {
        path: "/admin/category/edit-sub-category/:id",
        element: <EditSubCategory />,
      },
      {
        path: "/admin/category/sub-sub-categories",
        element: <AllSubSubCategory />,
      },
      {
        path: "/admin/category/add-sub-sub-category",
        element: <AddSubSubCategory />,
      },
      {
        path: "/admin/category/edit-sub-sub-category/:id",
        element: <EditSubSubCategory />,
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
        path: "/admin/front-end/banner",
        element: <Banner />,
      },
      {
        path: "/admin/front-end/add-banner",
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
