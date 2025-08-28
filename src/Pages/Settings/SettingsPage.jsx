import React from "react";
import { useNavigate } from "react-router-dom";
import PurchaseHistoryPage from "./PurchaseHistoryPage";
import { Button, Container, Row, Col } from "react-bootstrap";


function getUserProfile() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email && user.name) {
      return { name: user.name, email: user.email };
    }
    // Try to get from other sources (e.g., social login)
    // If you use OAuth, you might store info under a different key
    // Add more fallback logic here if needed
    return { name: "Unknown", email: "Unknown" };
  } catch {
    return { name: "Unknown", email: "Unknown" };
  }
}

const SettingsPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setTimeout(() => {
      window.location.replace("/login");
    }, 100);
  };

  const profile = getUserProfile();
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="bg-light p-4 m-5">
            <h4 className="fw-bold mb-4">Settings</h4>
            <div className="mb-4">
              <h5>Profile</h5>
              <ul>
                <li>Name: {profile.name}</li>
                <li>Email: {profile.email}</li>
              </ul>
            </div>
            <div className="mb-4">
              <h5>Purchase History</h5>
              <PurchaseHistoryPage />
            </div>
            <Button variant="danger" onClick={handleLogout} className="mt-3">
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
