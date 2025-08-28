
import React, { useContext, useState } from "react";
import { PurchaseHistoryContext } from "../../Store/PurchaseHistoryProvider.jsx";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import PurchaseSummaryModal from "./PurchaseSummaryModal";

const PurchaseHistoryPage = () => {
  const { purchases } = useContext(PurchaseHistoryContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="bg-light p-4 m-5">
            <h4 className="text-center fw-bold">Purchase History</h4>
            {purchases.length === 0 ? (
              <p className="text-center">No past purchases found.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>City</th>
                    <th>Phone</th>
                    <th>Total</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((order, idx) => (
                    <tr key={idx} style={{ cursor: "pointer" }}>
                      <td>{idx + 1}</td>
                      <td>{order.date}</td>
                      <td>{order.shipping.city}</td>
                      <td>{order.shipping.phone}</td>
                      <td>${order.items.reduce((acc, item) => acc + item.price * item.count, 0)}</td>
                      <td>
                        <Button size="sm" variant="info" onClick={() => handleShowModal(order)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <PurchaseSummaryModal show={showModal} onHide={handleCloseModal} order={selectedOrder} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PurchaseHistoryPage;
