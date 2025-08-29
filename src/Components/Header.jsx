import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { CartContext } from "../Store/CartContext";
import { totalCartItems } from "../Logic/Logic";
import Offcanvas from "react-bootstrap/Offcanvas";
import { WishlistContext } from "../Store/WishlistContext";

const Header = () => {
  const ref = useRef(null);
  const location = useLocation();
  const { items, token } = useContext(CartContext);
  const { responsive } = useContext(WishlistContext);
  const itemsCount = totalCartItems(items);
  const [change, setChange] = useState(true);

  useEffect(() => {
    const changeBackground = () => {
      if (ref.current && window.scrollY <= ref.current.clientHeight) {
        setChange(true);
      } else {
        setChange(false);
      }
    };
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const id = useParams().id;

  return (
    <>
      <Navbar
        ref={ref}
        expand={"md"}
        className={
          (change ? "navbar w-100" : "active_Nav position-fixed w-100") +
          " bg-secondary" // Bootstrap gray background
        }
        style={{ minHeight: 80 }}
      >
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="align-items-center justify-content-between flex-grow-1 pe-3 flex-row">
                <Nav className="d-flex align-items-center flex-row gap-3" style={{ minWidth: 220 }}>
                  <Navbar.Brand className="brand pointer d-flex align-items-center me-3 p-0" style={{ minWidth: 130 }}>
                    <NavLink className={`Nav-Link pointer p-0 m-0`} to={"/"} end style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src="/images/logo.jpg"
                        alt="logo"
                        width={110}
                        height={50}
                        style={{ objectFit: "contain", display: "block" }}
                        fetchPriority="high"
                      />
                    </NavLink>
                  </Navbar.Brand>
                  <NavLink className={`p-1 ms-2 Nav-Link mt-2`} to={"/"} end>
                    Home
                  </NavLink>
                  <NavLink className="p-1 ms-2 Nav-Link mt-2" to={"/categories"}>
                    Categories
                  </NavLink>
                  <NavLink className="p-1 ms-2 Nav-Link mt-2" to={"/brands"}>
                    Brands
                  </NavLink>
                  <NavLink
                    className={`${id === undefined ? "Nav-Link" : "sub-color"} mt-2 ms-2 p-1`}
                    to={"/products"}
                  >
                    Products
                  </NavLink>
                </Nav>
                <Nav className="d-flex align-items-center flex-row gap-2">
                  {token === null ? (
                    <NavLink className="Nav-Link login py-1 px-3 my-2 me-4" to={"/login"}>
                      Login
                    </NavLink>
                  ) : (
                    <NavLink className="p-1 Nav-Link mt-2" to={"/settings"} style={{marginLeft: 0}}>
                      <i className="fa-solid fa-gear fs-4"></i>
                    </NavLink>
                  )}
                  <Link to={"../cart"} className={"text-center mb-2"}>
                    <svg
                      className={`cart`}
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 164.9 196.4"
                      preserveAspectRatio="xMinYMax meet"
                      data-hook="svg-icon-9"
                      fill={
                        location.pathname.includes("cart")
                          ? "#07b6da"
                          : "#fff"
                      }
                    >
                      <text
                        x="84"
                        y="131"
                        dy=".35em"
                        textAnchor="middle"
                        className="text-items p-4"
                        data-hook="items-count"
                      >
                        {itemsCount}
                      </text>
                      <path d="M81.9 11.5c-18.8 0-34.1 16-34.1 35.7v18.1h7.8V47.2c0-15.4 11.8-27.9 26.4-27.9 14.5 0 26.4 12.5 26.4 27.9v18.1h6.6V64h1.1V47.2c-.1-19.7-15.4-35.7-34.2-35.7z"></path>
                      <path d="M156.9 70.5v118H8v-118h148.9m8-8H0v134h164.9v-134z"></path>
                    </svg>
                  </Link>
                  <Link to={"../wishlist"} className={"text-center"}>
                    <i
                      className="wishlist m-2 ms-3 p-1 fs-3 fa-regular fa-heart"
                      style={{
                        color: location.pathname.includes("wishlist") ? "#07b6da" : "#fff",
                        transition: "color 0.3s"
                      }}
                    >
                      <p className="wishlist-product-count">
                        {Array.isArray(responsive?.data?.data)
                          ? responsive.data.data.length
                          : 0}
                      </p>
                    </i>
                  </Link>
                </Nav>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;