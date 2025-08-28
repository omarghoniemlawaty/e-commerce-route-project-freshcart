import React from "react";
import SampleNextArrow from "../../Components/SampleNextArrow";
import Slider from "react-slick";

const HomeSlider = ({
  slidesToShow,
  children,
  display,
  speed,
  dots,
  slidesToScroll,
  lg , 
  md ,
  sm
}) => {
  const settings = {
    infinite: true,
    autoplay: true,
    dots,
    speed,
    slidesToShow,
    slidesToScroll:slidesToScroll || 1,
    nextArrow: <SampleNextArrow display={display} />,
    prevArrow: <SampleNextArrow display={display} />,
     responsive: [
 {
        breakpoint: 1024,
        settings: {
          slidesToShow: lg,
          slidesToScroll: lg,
          infinite: true,
          dots
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: md,
          slidesToScroll: md,
          initialSlide: md
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: sm,
          slidesToScroll: sm
        }
      }
    ]
  };


  return <Slider {...settings}>{children}</Slider>;
};

export default HomeSlider;
