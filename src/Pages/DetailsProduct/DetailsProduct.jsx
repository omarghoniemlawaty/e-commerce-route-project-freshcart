import React, { useContext, useEffect, useState } from "react";
import { mainFormHandlerTypeRaw } from "../../util/http";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Autoplay } from "swiper/modules";
import Style from "./DetailsProduct.module.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import Loading from "../../Components/Loading";
import { CartContext } from "../../Store/CartContext";

const DetailsProduct = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { addProductToCart } = useContext(CartContext);
  const id = useParams().id;
  
  const getProducts = async (id) => {
    setLoading(true);
    const responsive = await mainFormHandlerTypeRaw({
      method: "get",
      type: `api/v1/products/${id}`,
    });
    setDetails(responsive?.data?.data);
    setLoading(false);
  };
  
  useEffect(() => {
  setThumbsSwiper()  
    getProducts(id);
  }, [id]);

  if (loading) return <Loading />;
  else {
    
    if (details.length !== 0) {
      return (
        <div className="slider-container pt-5">
          <Container>
            <Row>
              <div className="d-flex flex-wrap justify-content-center align-items-center">
               
                 <Col lg={5} md={6} sm={10} xs={10}>
                  <div className="w-100">
                    <Swiper
                      spaceBetween={1}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Thumbs, Autoplay]}
                      autoplay={true}
                      className={` ${Style.mySwiper2} my-4 mx-1`}
                    >
                      <div>
                        {details?.images !== undefined &&
                          details?.images.map((image) => {
                            return (
                              <SwiperSlide key={image}>
                                <img
                                  className="w-100 px-2"
                                  height={450}
                                  src={image}
                                  alt={details.title}
                                />
                              </SwiperSlide>
                            );
                          })}
                      </div>
                    </Swiper>
                  
                     <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode , Thumbs]}
                      className={`${Style.mySwiper} my-3 mx-1`}
                    >
                      {details?.images !== undefined &&
                        details?.images.map((image) => {
                          return (
                            <SwiperSlide
                              key={image}
                              className={`${Style.SwiperSlide1}`}
                            >
                               <img
                               className={`${Style.mySwiper} w-100 px-2`}
                                src={image !== null && image}
                                alt={details?.title}
                              />
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>

                  </div>
                </Col>

                <Col lg={7} md={6} sm={10} xs={10}>
                  <div className="m-3 w-100 text-center">
                    <h3 className="fs-4 m-4">{details?.title}</h3>
                    <p>{details?.description}</p>
                    <h4 className="d-flex justify-content-around">
                      <p>{details?.price} </p>
                      <p>
                        <span className="ms-5 fs-6">
                          {details?.ratingsAverage}
                          <i className="fa-solid fa-star text-warning"></i>
                          <i className="fa-solid fa-star text-warning"></i>
                          <i className="fa-solid fa-star text-warning"></i>
                          <i className="fa-solid fa-star text-warning"></i>
                        </span>
                      </p>
                    </h4>
                    <button
                      className={` ${Style.addTOCart} pointer border-0 w-75 m-auto px-2 py-1 bg-dark text-light my-4 rounded-2`}
                      onClick={() => addProductToCart(details)}
                    >
                      Add TO Cart
                    </button>
                  </div>
                </Col>
   
              </div>

            </Row>
          </Container>
        </div>
      );
    }
  }
};

export default DetailsProduct;

