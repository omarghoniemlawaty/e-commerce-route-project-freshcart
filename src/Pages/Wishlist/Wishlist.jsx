import React, { Fragment, useContext } from "react";
import { CartContext } from "../../Store/CartContext";
import { Col, Container, Row } from "react-bootstrap";
import Style from "./Wishlist.module.css";
import { WishlistContext } from "../../Store/WishlistContext";
import Loading from "../../Components/Loading";
const Wishlist = () => {
  const { addProductToCart } = useContext(CartContext);
  const { removeToWishlist , responsive , loading } = useContext(WishlistContext);

  if (!loading) {
    return (
      <div className={`${Style.WishlistCover}`}>
        <Container>
          <Row>
            <Col md={11}>
              <div
                className={`${Style.cartItems} bg-light mt-5 d-flex flex-wrap justify-content-between align-items-center w-100`}
              >
                {responsive?.data?.data.length >= 0 &&
                (responsive?.data?.data !== undefined &&
                  responsive?.data?.data.length) !== 0 ? (
                  responsive?.data?.data.map((product) => {
                    return (
                      <Fragment key={product.id}>
                        <div className={"w-25 mt-1"}>
                          <ul className="d-flex">
                            <li>
                              <img
                                src={product.imageCover}
                                alt={product.title}
                                width={80}
                              />
                            </li>

                            <li className="p-2">
                              <p>{product.brand.name}</p>
                              <p>${product.price}</p>
                            </li>
                          </ul>
                        </div>

                        <div className={`${Style.updateCountItem} me-4 `}>
                          <ul className="d-flex justify-content-between align-items-center h-100">
                            <li>
                              <button
                                className="mt-1 buyBtn wishBtn py-1 mb-3 m-auto border-0 "
                                onClick={() => {
                                  addProductToCart(product);
                                }}
                              >
                                buy
                              </button>
                            </li>
                            <li>
                              <svg
                                className={`${Style.svgColor} mb-2 `}
                                onClick={() => {
                                  removeToWishlist(product.id);
                                }}
                                viewBox="0 0 24 24"
                                fillRule="currentColor"
                                width="24"
                                height="24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M13.5,3 C14.327,3 15,3.673 15,4.5 L15,4.5 L15,5 L19,5 L19,6 L18,6 L18,17.5 C18,18.879 16.878,20 15.5,20 L15.5,20 L7.5,20 C6.122,20 5,18.879 5,17.5 L5,17.5 L5,6 L4,6 L4,5 L8,5 L8,4.5 C8,3.673 8.673,3 9.5,3 L9.5,3 Z M17,6 L6,6 L6,17.5 C6,18.327 6.673,19 7.5,19 L7.5,19 L15.5,19 C16.327,19 17,18.327 17,17.5 L17,17.5 L17,6 Z M10,9 L10,16 L9,16 L9,9 L10,9 Z M14,9 L14,16 L13,16 L13,9 L14,9 Z M13.5,4 L9.5,4 C9.224,4 9,4.225 9,4.5 L9,4.5 L9,5 L14,5 L14,4.5 C14,4.225 13.776,4 13.5,4 L13.5,4 Z"
                                ></path>
                              </svg>
                            </li>
                          </ul>
                        </div>

                        <hr className="w-100" />
                      </Fragment>
                    );
                  })
                ) : (
                  <h5 className="m-auto">wishlist is empty</h5>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else return <Loading />;
};

export default Wishlist;
