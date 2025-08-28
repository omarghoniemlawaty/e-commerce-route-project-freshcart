import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import american_express from "../../images/american express.svg";
import master_card from "../../images/master card.svg";
import paypal from "../../images/paypal.svg";
import visa from "../../images/visa.svg";
import google_play from "../../images/google play.svg";
import app_store from "../../images/app store.svg";
import Button from "../Ui/Button";
import Style from "./Footer.module.css";
const Footer = () => {
  const paymentPartners = [american_express, master_card, paypal, visa];

  return (
    <footer className="w-100 text-light">
      <Container>
        <Row>
          <Col md={12} className="my-5">
            <div>
              <h4>Get The FreshCart App</h4>
              <p>
                We will send you a link, open it on your phone to download the
                app.
              </p>
            </div>
          </Col>
          <Col md={12} className="mb-5">
            <div className="d-flex flex-wrap justify-content-between mt-4">
              <Col md={8} sm={10} xs={12}>
                <input
                  className="w-100 px-2 py-1 rounded-2 form-control mt-3"
                  placeholder="email"
                />
              </Col>

              <Col md={3} sm={7} xs={7}>
                <Button className={`${Style.Share_App_Link} px-2 border-0 bg-light w-75 rounded-1 p-1 mt-3 `}>
                  Share App Link
                </Button>
              </Col>
            </div>
          </Col>

          <hr className="bg-light" />

          <Col md={12} className="my-4">
            <div className="d-flex flex-wrap justify-content-between">
              <Col md={5} sm={10} className="mb-1">
                <span className="text-light">Payment Partners</span>
                {paymentPartners.map((image) => {
                  return (
                    <img key={image}
                      src={`${image}`}
                      alt={image}
                      className="ms-3"
                      width={30}
                    />
                  );
                })}
              </Col>
              <Col md={6} sm={12}>
                <span className="text-light">
                  Get deliveries with FreshCart
                </span>
                <img
                  src={google_play}
                  className="ms-3"
                  alt="google play"
                  width={150}
                />
                <img
                  src={app_store}
                  className="ms-3"
                  alt="google play"
                  width={150}
                />
              </Col>
            </div>
          </Col>

          <hr className="bg-light my-3" />

          <Col md={12}>
            <div className="d-flex flex-wrap justify-content-between">
              <Col md={6} sm={7} xs={12}>
                <div>
                  <p className="text-light">
                    © 2022 - 2024 FreshCart e-Commerce HTML Template. All rights
                    reserved.
                  </p>
                  <p className="text-light">
                    Powered by <span className="text-info">Codescandy</span>
                  </p>
                </div>
              </Col>
              <Col md={3} sm={5} xs={12}>
                <div>
                  <p>
                    Follow us on
                    <span className="ms-1">
                      <i
                        className={`${Style.icons} fa-brands fa-facebook mx-2`}
                      ></i>
                      <i
                        className={`${Style.icons} fa-brands fa-twitter mx-2`}
                      ></i>
                      <i
                        className={`${Style.icons} fa-brands fa-instagram ms-2`}
                      ></i>
                    </span>{" "}
                  </p>
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
