import React from "react";
import { Modal, Table, Button } from "react-bootstrap";

const PurchaseSummaryModal = ({ show, onHide, order }) => {
  if (!order) return null;
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Order Date: {order.date}</h6>
        <ul>
          <li>Phone: {order.shipping.phone}</li>
          <li>City: {order.shipping.city}</li>
          <li>Details: {order.shipping.details}</li>
        </ul>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i}>
                <td>{item.product ? item.product.title : item.title}</td>
                <td>${item.price}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h6 className="text-end">Total: ${order.items.reduce((acc, item) => acc + item.price * item.count, 0)}</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseSummaryModal;
