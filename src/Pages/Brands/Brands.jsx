import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useFetch } from "../../Hooks/useFetch";
import ModalContent from "../../Components/Ui/ModalContent";
import Loading from "../../Components/Loading";

const Brands = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState({
    image: " ",
    name: "",
  });

  const handleShow = (image) => {
    setShow(true);
    setContent(image);
  };
  const {data , loading} = useFetch({ method: "get", type: "api/v1/brands"});
if(!loading){
  return (
    <>
      { content.image !== undefined && (
        <>
          <ModalContent content={content} show={show} setShow={setShow}/>
          <Container>
            <Row>
              <div className="d-flex flex-wrap justify-content-around p-5 align-items-center">
              { data?.data?.data?.length !== 0 &&
                  data?.data?.data.map((product) => (
                    <Col lg={3} md={4} sm={12} xs={12} key={product._id}>
                      <div
                        className="my-3 card m-2 pointer"
                      >
                        <img
                          src={product.image}
                          className="w-100"
                          alt={product.name}
                          onClick={() =>
                            handleShow({
                              image: product.image,
                              name: product.name,
                            })
                          }
                        />
                        <h5 className="ms-4">{product.name}</h5>
                      </div>
                    </Col>
                  ))}
              </div>
            </Row>
          </Container>
        </>
      )}
    </>
  );
  }
  else return <Loading/>
};

export default Brands;
