import { createBrowserRouter } from "react-router-dom";
import NotFound from "../Errors/NotFound";
import Main from "../layouts/Main";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/auth/Profile";
import ProtectedRoute from "../pages/Protected/ProtectedRoute";
import Otp from "../pages/auth/Otp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import UpdatePassword from "../pages/auth/UpdatePassword";
import AuthExist from "../pages/Protected/AuthExist";
 
import VerifiedUser from "../pages/Protected/VerifiedUser";
import Settings from "../pages/auth/Settings";
import Address from "../pages/address/Address";
import Create from "../pages/address/Create";
import Edit from "../pages/address/Edit";
import Home from "../pages/home/Home";
import Product from "../components/Product";
import Categories from "../pages/category/Categories";
import Policy from "../pages/privacy/Policy";
import Category from "../components/category/Category";
import HomeProducts from "../pages/home/HomeProducts";
import Checkout from "../pages/checkout/Checkout";
import ProtectedCheckout from "../pages/Protected/ProtectedCheckout";
import MyOrder from '../pages/myorder/MyOrder';
import Invoice from "../pages/myorder/Invoice";


const routes = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "login",
          element: <AuthExist><Login /></AuthExist>,
        },
        {
          path: "register",
          element: <AuthExist><Register /></AuthExist>,
        },
        {
          path: "verify-otp",
          element: <VerifiedUser><Otp /></VerifiedUser>,
        },
        {
          path: "profile",
          element: <ProtectedRoute><Profile /></ProtectedRoute>,
        },
        {
          path: "settings",
          element: <ProtectedRoute><Settings /></ProtectedRoute>,
        },
        {
          path: "user/address",
          element: <ProtectedRoute><Address /></ProtectedRoute>,
        },
        {
          path: "user/address/create",
          element: <ProtectedRoute><Create /></ProtectedRoute>,
        },
        {
          path: "user/address/edit/:addressId",
          element: <ProtectedRoute><Edit /></ProtectedRoute>,
        },
        {
          path: "user/my-orders",
          element: <ProtectedRoute><MyOrder /></ProtectedRoute>,
        },
        {
          path: "user/order-invoice/:orderId",
          element: <ProtectedRoute><Invoice /></ProtectedRoute>,
        },
        // checkout
        {
          path: "/order/checkout",
          element: <ProtectedCheckout><Checkout/></ProtectedCheckout>,
        },
      
        {
          path: "product/:slug",
          element: <Product />,
        },
        {
          path: "products",
          element: <HomeProducts />,
        },

        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "category/products/:category_id",
          element: <Category />,
        },



        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "password-reset/:token",
          element: <UpdatePassword />,
        },
        {
          path:"privacy-policy",
          element:<Policy/>
        }
      ],
    },
    {
      path:"*",
      element: <NotFound/>
    }
  ]);
  
  export default routes;
  