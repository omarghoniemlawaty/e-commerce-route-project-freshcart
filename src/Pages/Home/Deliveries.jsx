import React from "react";
import { Col } from "react-bootstrap";

const Deliveries = () => {
  return (
    <Col
      md={12}
      className="w-100 bg-dark my-5 p-4 text-light d-flex justify-content-around flex-wrap"
    >
      <ul className="d-flex flex-wrap justify-content-around p-3 align-items-center">
        <li className="rounded-circle p-3 border border-info me-3">
          <i className="text-info fa-solid fa-truck "></i>
        </li>
        <li>
          <h6 className="deliveries-h6">Free Shipping</h6>
          <h6 className="deliveries-h6">Free delivery over $500</h6>
        </li>
      </ul>

      <ul className="d-flex flex-wrap justify-content-around p-3 align-items-center">
        <li className="rounded-circle p-3 border border-info me-3">
          <i className="text-info fa-brands fa-wirsindhandwerk fs-3"></i>
        </li>
        <li>
          <h6 className="deliveries-h6">Secure Shopping</h6>
          <h6 className="deliveries-h6">Secured Payment Gateway</h6>
        </li>
      </ul>

      <ul className="d-flex flex-wrap justify-content-around p-3 align-items-center">
        <li className="rounded-circle p-3 border border-info me-3">
          <i className="text-info fa-brands fa-slideshare fs-3"></i>
        </li>
        <li>
          <h6 className="deliveries-h6">Free Returns</h6>
          <h6 className="deliveries-h6">Hassle free returns</h6>
        </li>
      </ul>
    </Col>
  );
};

export default Deliveries;
