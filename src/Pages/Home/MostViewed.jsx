import React from "react";
import { useContext } from "react";
import { Col } from "react-bootstrap";
import { CartContext } from "../../Store/CartContext";
import HomeSlider from "./HomeSlider";
import Style from "./Home.module.css"

const MostViewed = ({ mostViewedProducts }) => {
  const { addProductToCart } = useContext(CartContext);

  return (
    <Col md={12} className="my-5 text-center text-light bg-dark p-2">
      <div >
        <h3 className={" text-center text-light bg-dark p-2"}>Most Viewed</h3>
      </div>
      <HomeSlider
        slidesToShow={4}
        lg={3}
        md={2}
        sm={1}
        dots={false}
        speed={500}
        display={"none"}
      >
        {mostViewedProducts.length !== 0 &&
          mostViewedProducts.map((product) => {
            return (
              <div className="w-100 pointer" key={product.id}>
                <div className="d-flex">
                  <div
                    className={
                      "bg-light text-black w-100 m-2 d-flex justify-content-between align-items-center p-1 px-4"
                    }
                  >
                    <div>
                      <img
                        src={product.imageCover}
                        width={45}
                        alt={product.title}
                      />
                    </div>

                    <div>
                      <h6 className="title ms-3">{product.category.name}</h6>
                      <span>${product.price}</span>
                      <i
                        className={`fa-solid fa-cart-shopping ms-5 cart-shopping ${Style.cart_shopping}`}
                        onClick={() => {
                          addProductToCart(product);
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </HomeSlider>
    </Col>
  );
};

export default MostViewed;
