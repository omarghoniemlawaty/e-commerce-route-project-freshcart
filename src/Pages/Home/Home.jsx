import React, { useEffect, useState } from "react";
import MainSlider from "./MainSlider";
import CategoriesSlider from "./CategoriesSlider";
import { Container, Row } from "react-bootstrap";
import Deliveries from "./Deliveries";
import CategoriesList from "./CategoriesList";
import SomeProducts from "./SomeProducts";
import MostViewed from "./MostViewed";
import { mainFormHandlerTypeRaw } from "../../util/http";
import Loading from "../../Components/Loading";
const Home = () => {
  const [listProducts, setListProducts] = useState([]);
  const [mostViewedProducts, setMostViewedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [ loading , setLoading] = useState(false)
 
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
    const responsive = await mainFormHandlerTypeRaw({
      method: "get",
      type: "api/v1/products",
    });
    setLoading(false)
    
  setProducts(responsive?.data?.data)
   setMostViewedProducts(
      responsive?.data.data.filter(
        (product, index) =>
          index === 10 ||
          index === 14 ||
          index === 12 ||
          index === 22 ||
          index === 5 ||
          index === 2 ||
          index === 35
      )
    );

    setProducts(responsive?.data?.data);
    setListProducts(responsive?.data?.data.filter(
      (product) => product.category.name === "Women's Fashion"
    ))
  };
    getProducts();
  }, []);


if (!loading){
     return (
    <>
      <div className="home p-5">
        <Container className="home-container">
          <Row>
            <MainSlider />
            <CategoriesSlider />
            <Deliveries />
            <CategoriesList
              products={products}
              listProducts={listProducts}
              setListProducts={setListProducts}
            />
            <SomeProducts listProducts={mostViewedProducts} /> 
            <MostViewed mostViewedProducts={mostViewedProducts} />
          </Row>
        </Container>
      </div>
    </>
  );
}
 else return <Loading/>
  

};

export default Home;
