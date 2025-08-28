import React, { useContext, useState, useEffect } from "react";
import { WishlistContext } from "./WishlistContext";
import { mainFormHandlerTypeRaw } from "../util/http";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";
const WishlistContextProvider = ({ children }) => {
  const { token } = useContext(CartContext);
  const [wishlistProduct, setWishlistProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responsive, setResponsive] = useState();

  const notifySuccess = (text) => {
    toast.success(text);
  };

  const addToWishlist = async (id, text) => {
    if (token !== null) {
      notifySuccess(text);
      const responsive = await mainFormHandlerTypeRaw({
        method: "post",
        type: "api/v1/wishlist",
        fromData: { productId: id },
        token,
      });
      setWishlistProduct(responsive.data.data);
    }else notifySuccess("Please log in")
  };
  const removeToWishlist = async (id, text) => {
    if (token !== null) {
      notifySuccess(text);
      const responsive = await mainFormHandlerTypeRaw({
        method: "delete",
        type: `api/v1/wishlist/${id}`,
        token,
      });
      setWishlistProduct(responsive.data.data);
    }else notifySuccess("Please log in")
  };

  useEffect(() => {
    const getFetch = async () => {
      setLoading(true);
      const data = await mainFormHandlerTypeRaw({
        method: "get",
        type: "api/v1/wishlist",
        token: token,
      });
      setLoading(false);
      setResponsive(data);
    };

    if (token !== null) {
      getFetch();
    }
  }, [token, wishlistProduct.length]);

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        removeToWishlist,
        wishlistProduct,
        loading,
        responsive,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
