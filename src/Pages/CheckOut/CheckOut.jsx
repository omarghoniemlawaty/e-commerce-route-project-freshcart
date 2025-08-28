import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Store/CartContext";
import FormComponentBM from "../../Components/Form/FormComponentBM.jsx";
import { detailsInputs } from "../../Logic/DetailsInputs.js";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useValidation } from "../../Hooks/useValidation";
import Loading from "../../Components/Loading";

const CheckOut = () => {
  const [loading , setLoading] =useState(false)
  useEffect(()=>{
    setLoading(true)
    setTimeout( ()=>
      {setLoading(false)} , [1000])
} , [])
  const { token , cart_id } =useContext(CartContext)

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

   const {phone , details , name } = useValidation();
  
    const validationSchema = Yup.object({
      phone: phone,
      city: name,
      details: details,
    });
    if(!loading){
return (
       <Container>
          <Row className={`d-flex justify-content-center`}>
            <Col md={6}>
              <div className="bg-light p-4 m-5">
                <h4 className="text-center fw-bold">Check Out</h4>
    <FormComponentBM
      detailsInputs={detailsInputs.filter(
        (detailsInput) =>
          (detailsInput.name === "phone" ||
            detailsInput.name === "details" ||
            detailsInput.name === "city") &&
            detailsInput
      )}
      initialValues={initialValues}
      validationSchema={validationSchema}
      url={`api/v1/orders/${cart_id?.data?.data?._id}`}
      method={"post"}
      inputStyle={`formInputs mb-4`}
      success={"../"}
      token={token}
      btn={"check out"}
    />
    </div>
    </Col>
    </Row>
    </Container>
  );
    }
  else return <Loading/>
};

export default CheckOut;
