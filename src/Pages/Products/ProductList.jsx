import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
// ...existing code...
import Style from "../Home/Home.module.css";
import { CartContext } from "../../Store/CartContext";
import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { WishlistContext } from "../../Store/WishlistContext";

const ProductList = ({ products, loading }) => {
  const { addProductToCart } = useContext(CartContext);
  const { addToWishlist, removeToWishlist, wishlistProduct } = useContext(WishlistContext);
  const [wishlistAnim, setWishlistAnim] = useState({});
  const [localWishlist, setLocalWishlist] = useState([]);
  const { token } = useContext(CartContext);

  // Sync localWishlist with context on mount and when wishlistProduct changes
  useEffect(() => {
    setLocalWishlist(wishlistProduct);
  }, [wishlistProduct]);

  const handleWishlistClick = (productId, isInWishlist, cb) => {
    if (!token) {
      toast.error("You must log in first to use the wishlist.");
      return;
    }
    setWishlistAnim((prev) => ({ ...prev, [productId]: true }));
    setLocalWishlist((prev) =>
      isInWishlist
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    cb();
    setTimeout(() => {
      setWishlistAnim((prev) => ({ ...prev, [productId]: false }));
    }, 400);
  };

  return (
    <div className="d-flex flex-wrap justify-content-around p-5 align-items-center">
      {Array.isArray(products) && products.length > 0 &&
        products.map((product) => (
          <Col lg={3} md={4} sm={6} xs={10} className="my-5" key={product.id}>
            <div className="w-100 p-2">
              <div className="my-2">
                <div
                  className={`${loading ? "placeholder" : ""} product-layout rounded-1`}
                >
                  <NavLink
                    className="p-1 Nav-Link"
                    to={`/products/${product.id}`}
                  >
                    <img
                      src={product.imageCover}
                      className="w-100 "
                      alt={product.title}
                      height={400}
                    />
                  </NavLink>
                  <h5 className="mx-3 mt-2">{product.category.name}</h5>
                  <p className="title ms-3">{product.title}</p>
                  <svg
                    onClick={() => {
                      const isInWishlist = localWishlist.includes(product.id);
                      handleWishlistClick(product.id, isInWishlist, () => {
                        if (!token) return;
                        if (!isInWishlist) {
                          addToWishlist(product.id, "added to wishlist");
                        } else {
                          removeToWishlist(product.id, "remove to wishlist");
                        }
                      });
                    }}
                    stroke="currentColor"
                    fill={
                      localWishlist.includes(product.id)
                        ? "rgba(13, 202, 240, 1)"
                        : "#000"
                    }
                    version="1.1"
                    viewBox="0 0 512 512"
                    className={
                      `favorite-product sm:mr-4 mr-2 text-teal-500 me-3 text-dark pointer ` +
                      (wishlistAnim[product.id] ? Style["wishlist-animate"] : "")
                    }
                    height="33"
                    width="33"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z" />
                  </svg>
                  <h6 className="ms-3">${product.price}</h6>
                  <button
                    className="buyBtn left py-1 mb-3 px-3 border-0 "
                    onClick={() => {
                      addProductToCart(product);
                    }}
                  >
                    buy
                  </button>
                </div>
              </div>
            </div>
          </Col>
        ))}
    </div>
  );
}

export default ProductList;
