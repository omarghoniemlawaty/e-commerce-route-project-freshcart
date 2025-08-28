import React, { Fragment } from "react";
import { Col } from "react-bootstrap";
import HomeSlider from "./HomeSlider";

const MainSlider = () => {
  const mainImages = [ "/images/slider-image-2.webp", "/images/slider-image-1.webp", "/images/slider-image-3.webp"];

  return (
    <Fragment>    
      <Col md={9} className="py-3">
        <HomeSlider
          slidesToShow={1}
          lg={1}
          md={1}
          sm={1}
          speed={1000}
          display={"none"}
          dots={true}
        >
          {mainImages.map((images) => {
            return (
              <div key={images}>
                <img src={images} alt={images} width={"100%"} height={500} />
              </div>
            );
          })}
        </HomeSlider>
      </Col>

      <Col>
        <div className="mt-4 me-1">
          <img src="/images/grocery-banner.webp" alt="banner" className="banner w-100 m-2" height={225} />
        </div>

        <div className="me-1">
          <img src="/images/banner-2.webp" alt="banner2" className="banner2 w-100 m-2" height={225} />
        </div>
      </Col>
    </Fragment>
  );
};

export default MainSlider;
