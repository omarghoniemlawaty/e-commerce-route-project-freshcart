import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Store/CartContext";
import FormComponentBM from "../../Components/Form/FormComponentBM.jsx";
import { detailsInputs } from "../../Logic/DetailsInputs.js";
import { Col, Container, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import { useValidation } from "../../Hooks/useValidation";
import Loading from "../../Components/Loading";
import { toast } from "react-toastify";
import { PurchaseHistoryContext } from "../../Store/PurchaseHistoryProvider.jsx";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const [loading, setLoading] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);
  const { token, cart_id, items } = useContext(CartContext);
  const { addPurchase } = useContext(PurchaseHistoryContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const { phone, details, name } = useValidation();

  const validationSchema = Yup.object({
    phone: phone,
    city: name,
    details: details,
  });

  // Custom submit handler to show summary, toast, and save purchase
  const handleOrderSubmit = async (values, apiResponse) => {
    if (!token) {
      toast.error("You must log in first to make a purchase.");
      return;
    }
    toast.success("Order placed successfully!");
    addPurchase({
      order: apiResponse?.data?.data || {},
      items: items,
      shipping: values,
      date: new Date().toLocaleString(),
    });
    setOrderSummary({
      order: apiResponse?.data?.data || {},
      items: items,
      shipping: values,
      date: new Date().toLocaleString(),
    });
    setTimeout(() => {
      navigate("/settings");
    }, 2000);
  };

  if (loading) return <Loading />;

  if (orderSummary) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="bg-light p-4 m-5">
              <h4 className="text-center fw-bold">Order Summary</h4>
              <p className="text-center">Order Date: {orderSummary.date}</p>
              <h5>Shipping Details</h5>
              <ul>
                <li>Phone: {orderSummary.shipping.phone}</li>
                <li>City: {orderSummary.shipping.city}</li>
                <li>Details: {orderSummary.shipping.details}</li>
              </ul>
              <h5>Products</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orderSummary.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.product ? item.product.title : item.title}</td>
                      <td>${item.price}</td>
                      <td>{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <h5 className="text-end">Total: ${orderSummary.items.reduce((acc, item) => acc + item.price * item.count, 0)}</h5>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

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
              success={null}
              token={token}
              btn={"check out"}
              onOrderSuccess={handleOrderSubmit}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOut;
