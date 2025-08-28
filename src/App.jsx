import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useCallback, useContext, useEffect } from "react";
import Home from "./Pages/Home/Home.jsx";
import Brands from "./Pages/Brands/Brands.jsx";
import Products from "./Pages/Products/Products.jsx";
import Layout from "./Components/Layout.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Categories from "./Pages/Categories/Categories.jsx";
import Login from "./Pages/Authentication/Login/Login.jsx";
import Register from "./Pages/Authentication/Register/Register.jsx";
import DetailsProduct from "./Pages/DetailsProduct/DetailsProduct.jsx";
import { CartContext } from "./Store/CartContext.jsx";
import { ToastContainer, Zoom } from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import CheckOut from "./Pages/CheckOut/CheckOut.jsx";
import Wishlist from "./Pages/Wishlist/Wishlist.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";


const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <NotFound/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "brands", element: <Brands />},
      { path: "products", element: <Products />},
      { path: "cart",  element: <Cart /> },
      { path: "categories", element: <Categories /> },
      { path: "products/:id", element: <DetailsProduct /> },
      { path: "checkout", element: <CheckOut /> },
      { path:"Wishlist" , element:<Wishlist/> ,} , 
      {
        path: "/login",
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);



const App = () => {
  const { fetchCart } = useContext(CartContext);

  const callFetchCart = useCallback(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    callFetchCart();    
  }, [callFetchCart ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        theme="dark"
        autoClose={500}
        toastStyle={{ color: "#d9dddf" }}
        transition={Zoom}
        progressStyle={"red"}
        pauseOnHover
      />
    </>
  );
};

export default App;
