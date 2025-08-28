import React, { useEffect, useState } from "react";
import { mainFormHandlerTypeRaw } from "../../util/http";
import { Container, Row } from "react-bootstrap";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import Loading from "../../Components/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await mainFormHandlerTypeRaw({
        method: "get",
        type: "api/v1/products",
      });
      setLoading(false);
      setProducts(data);
    };
    getProducts();
  }, []);

  if (!loading) {
    if (products.statusText === "OK") {
      const PRODUCT_PER_PAGE = 12;
      const pages = Math.ceil(products?.data?.data.length / PRODUCT_PER_PAGE);
      const startIndex = (currentPage - 1) * PRODUCT_PER_PAGE;
      const finishIndex = currentPage * PRODUCT_PER_PAGE;
      const orderedProducts = products?.data?.data.slice(
        startIndex,
        finishIndex
      );

      return (
        <>
          <>
            <Container className="home-container">
              <Row>
                <ProductList products={orderedProducts} loading={loading} />
                <Pagination
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  pages={pages}
                />
              </Row>
            </Container>
          </>
        </>
      );
    }
  } else return <Loading/>
};

export default Products;
