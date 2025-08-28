import React from "react";
import { Col } from "react-bootstrap";
import HomeSlider from "./HomeSlider";
import { useFetch } from "../../Hooks/useFetch";
const CategoriesSlider = () => {
  const {data} = useFetch({ method: "get", type: "api/v1/categories" });

  return (
    <Col md={12} className="py-5">
      <HomeSlider
        slidesToShow={7}
        slidesToScroll={5}
        lg={5}
        md={3}
        sm={2}
        display={"none"}
        speed={1000}
      >
        {data?.data?.data.length !== 0 &&
          data?.data?.data.map((category, index) => {
            return (
              <div className="p-2" key={index}>
                <img
                  src={category.image}
                  alt="slider-image-1"
                  className="w-100"
                  height={175}
                />
              </div>
            );
          })}
      </HomeSlider>
    </Col>
  );
};

export default CategoriesSlider;
