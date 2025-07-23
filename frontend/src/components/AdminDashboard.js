import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Button,
  Accordion,
  Offcanvas,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <Navbar
        expand="lg"
        className="px-3"
        style={{ backgroundColor: "#754c29" }}
        variant="dark"
      >
        <Navbar.Brand>Avanti Admin Panel</Navbar.Brand>
        <Button
          variant="outline-light"
          className="ms-auto"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Button
          variant="light"
          className="d-lg-none ms-2"
          onClick={toggleSidebar}
        >
          ☰
        </Button>
      </Navbar>

      {/* Sidebar + Main */}
      <Container fluid className="flex-grow-1">
        <Row>
          {/* Sidebar (visible on large) */}
          <Col
            lg={2}
            className="bg-light border-end pt-3 d-none d-lg-block"
            style={{ minHeight: "90vh", overflowY: "auto" }}
          >
            <Accordion alwaysOpen flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Dashboard</Accordion.Header>
                <Accordion.Body>
                  <Nav className="flex-column">
                    <Nav.Link href="#">Overview</Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Home Page</Accordion.Header>
                <Accordion.Body>
                  <Nav className="flex-column">
                    <Nav.Link href="#">Hero Section</Nav.Link>
                    <Nav.Link href="#">Collections</Nav.Link>
                    <Nav.Link href="#">Carousels</Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Shop</Accordion.Header>
                <Accordion.Body>
                  <Nav className="flex-column">
                    <Nav.Link as={Link} to="addproduct">
                      Products
                    </Nav.Link>

                    <Nav.Link href="#">Categories</Nav.Link>
                    <Nav.Link href="#">Banners</Nav.Link>
                    <Nav.Link href="#">Coupons</Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Orders & Users</Accordion.Header>
                <Accordion.Body>
                  <Nav className="flex-column">
                    <Nav.Link href="#">Orders</Nav.Link>
                    <Nav.Link href="#">Users</Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          {/* Sidebar as Offcanvas on Mobile */}
          <Offcanvas
            show={showSidebar}
            onHide={toggleSidebar}
            placement="start"
            className="bg-light"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Admin Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Accordion alwaysOpen flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Dashboard</Accordion.Header>
                  <Accordion.Body>
                    <Nav className="flex-column">
                      <Nav.Link href="#">Overview</Nav.Link>
                    </Nav>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Home Page</Accordion.Header>
                  <Accordion.Body>
                    <Nav className="flex-column">
                      <Nav.Link href="#">Hero Section</Nav.Link>
                      <Nav.Link href="#">Collections</Nav.Link>
                      <Nav.Link href="#">Carousels</Nav.Link>
                    </Nav>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Shop</Accordion.Header>
                  <Accordion.Body>
                    <Nav className="flex-column">
                      <Nav.Link as={Link} to="/addproduct">
                        Products
                      </Nav.Link>

                      <Nav.Link href="#">Categories</Nav.Link>
                      <Nav.Link href="#">Banners</Nav.Link>
                      <Nav.Link href="#">Coupons</Nav.Link>
                    </Nav>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Orders & Users</Accordion.Header>
                  <Accordion.Body>
                    <Nav className="flex-column">
                      <Nav.Link href="#">Orders</Nav.Link>
                      <Nav.Link href="#">Users</Nav.Link>
                    </Nav>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Offcanvas.Body>
          </Offcanvas>

          {/* Main Content */}
          <Col xs={12} lg={10} className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer
        className="text-white text-center py-2"
        style={{ backgroundColor: "#754c29" }}
      >
        © {new Date().getFullYear()} Avanti Admin Panel
      </footer>
    </div>
  );
};

export default AdminDashboard;
