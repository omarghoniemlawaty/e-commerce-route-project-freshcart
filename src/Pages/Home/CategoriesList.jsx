import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { CartContext } from "../../Store/CartContext";
import Button from "../../Components/Ui/Button";
import HomeSlider from "./HomeSlider";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../Store/WishlistContext";
const CategoriesList = ({ products , listProducts, setListProducts }) => {
  const { addProductToCart } = useContext(CartContext);
 const { addToWishlist, removeToWishlist, wishlistProduct } =
     useContext(WishlistContext);
  const specifyCategory = (category) => {
    if (category === "Women's Fashion") {
      setListProducts(
        products.filter(
          (product) => product.category.name === "Women's Fashion"
        )
      );
    } else if (category === "Men's Fashion") {
      setListProducts(
        products.filter((product) => product.category.name === "Men's Fashion")
      );
    } else if (category === "Electronics") {
      setListProducts(
        products.filter((product) => product.category.name === "Electronics")
      );
    }
  };

  return (
    <Col md={12} className="my-5">
      <div className="d-flex flex-wrap">
        <Col md={4} sm={12} xs={12}>
          <button
            className={`bg-dark p-3 w-100 ${
              listProducts[0]?.category.name === "Women's Fashion"
                ? "text-info"
                : "text-light"
            }`}
            onClick={() => specifyCategory("Women's Fashion")}
          >
            Women's Fashion
          </button>
        </Col>
        <Col md={4} sm={6} xs={12}>
          <button
            className={`bg-dark p-3 w-100 ${
              listProducts[0]?.category.name === "Men's Fashion"
                ? "text-info"
                : "text-light"
            }`}
            onClick={() => specifyCategory("Men's Fashion")}
          >
            Men's Fashion
          </button>
        </Col>

        <Col md={4} sm={6} xs={12}>
          <button
            className={`bg-dark p-3 w-100 ${
              listProducts[0]?.category.name === "Electronics"
                ? "text-info"
                : "text-light"
            }`}
            onClick={() => specifyCategory("Electronics")}
          >
            Electronics
          </button>
        </Col>
      </div>

      <HomeSlider slidesToShow={4} lg={3} md={2} sm={1} speed={4000}>
        {listProducts.length !== 0 &&
          listProducts.map((product) => (
            <div className="w-100 mb-5" key={product.id}>
              <div className="p-4">
                <div className="product-layout position-relative d-flex flex-wrap justify-content-between mt-3 align-items-center rounded-1">
                  <div className="w-100">
                    <Link to={`/products/${product.id}`}>
                      <img
                        className="w-100"
                        src={product.imageCover}
                        alt={product.title}
                      />
                    </Link>
                  </div>

                  <div className="w-100 me-5">
                    <h5 className="mx-3 fs-6 mt-2">{product.category.name}</h5>
                    <p className="title ms-3">{product.title}</p>
                    <h6 className="ms-3">${product.price}</h6>
                  </div>
                    <Button
                      className="buyBtn py-1 mb-2 m-auto px-4 border-0 "
                      onClick={() => {
                        addProductToCart(product);
                      }}
                    >
                      buy
                    </Button>

                      <svg
                    onClick={() => {
                      const wishlist = wishlistProduct.findIndex(
                        (WishlistId) => WishlistId === product.id
                      );
                      wishlist === -1
                        ? addToWishlist(product.id, "added to wishlist")
                        : removeToWishlist(product.id, "remove to wishlist");
                    }}
                    stroke="currentColor"
                    fill={`${
                      wishlistProduct.findIndex(
                        (WishlistId) => WishlistId === product.id
                      ) === -1
                        ? "#000"
                        : "rgba(13, 202, 240, 1)"
                    }`}
                    version="1.1"
                    viewBox="0 0 512 512"
                    className="favorite-product sm:mr-4 mr-2 text-teal-500 me-3 text-dark pointer"
                    height="33"
                    width="33"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </HomeSlider>
    </Col>
  );
};

export default CategoriesList;
