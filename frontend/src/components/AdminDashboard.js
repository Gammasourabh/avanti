import React, { useState } from 'react';
import {
  Container, Row, Col, Nav, Navbar, Button, Offcanvas,
} from 'react-bootstrap';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { FiLogOut, FiMenu, FiHome, FiBox, FiLayers, FiPackage, FiShoppingBag, FiChevronRight, FiChevronDown } from 'react-icons/fi';

const menuData = [
  {
    label: 'Dashboard',
    icon: <FiHome />,
    to: '/admin',
    items: [],
  },
  {
    label: 'Home',
    icon: <FiLayers />,
    items: [
      { label: 'Hero Section', to: '#' },
      { label: 'Collections', to: '#' },
      { label: 'Carousels', to: '#' },
    ],
  },
  {
    label: 'Shop',
    icon: <FiBox />,
    items: [
      { label: 'Categories', to: '#' },
      { label: 'Banners', to: '#' },
      { label: 'Coupons', to: '#' },
    ],
  },
  {
    label: 'Products',
    icon: <FiPackage />,
    items: [
      { label: 'Add Product', to: '/admin/add-product' },
      { label: 'All Products', to: '/admin/all-product' },
      { label: 'bulk import export', to: 'bulk-import-export' },
      { label: 'catagory', to: 'product-categories' },
    ],
  },
  {
    label: 'Orders & Users',
    icon: <FiShoppingBag />,
    items: [
      { label: 'Orders', to: '#' },
      { label: 'Users', to: '#' },
    ],
  },
];

const AdminDashboard = ({ themeColor = '#8D6748', accent = '#EBDFC8', fontFamily = 'Montserrat, serif' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Sidebar styles
  const sidebarBg = themeColor;
  const sidebarAccent = accent;
  const activeMenuStyle = {
    background: accent,
    color: themeColor,
    fontWeight: '600',
    borderRadius: '8px',
  };

  // Mobile/desktop sidebar toggle
  const renderMenu = (onClickClose = null) => (
    <nav
      aria-label="Admin Navigation"
      style={{
        background: sidebarBg,
        fontFamily,
        minHeight: "100vh",
        padding: "30px 0 20px 0",
      }}
    >
      <ul className="list-unstyled mb-0" style={{ marginRight: 0, paddingRight: 0 }}>
        {menuData.map((menu, idx) => (
          <li key={menu.label} style={{ margin: "0 0 16px 0" }}>
            <div
              style={{
                color: sidebarAccent,
                fontSize: 18,
                padding: '12px 26px 12px 26px',
                display: 'flex', alignItems: 'center',
                cursor: menu.items.length > 0 ? 'pointer' : 'default',
                fontWeight: 700,
                ...(openSection === idx ? { background: accent, color: themeColor, borderRadius: 8 } : {}),
                transition: 'all .2s',
              }}
              onClick={() => setOpenSection(openSection === idx ? null : idx)}
            >
              <span className="me-2">{menu.icon}</span>
              <span>{menu.label}</span>
              {menu.items.length > 0 && (
                <span className="ms-auto">{openSection === idx ? <FiChevronDown /> : <FiChevronRight />}</span>
              )}
            </div>
            {/* Submenu */}
            {menu.items.length > 0 && openSection === idx && (
              <ul className="list-unstyled ms-3 mb-1">
                {menu.items.map((item) => (
                  <li key={item.label}>
                    <Nav.Link
                      as={Link}
                      to={item.to}
                      className="my-1"
                      onClick={onClickClose}
                      style={{
                        color: location.pathname === item.to ? themeColor : sidebarAccent,
                        padding: '8px 0 8px 12px',
                        fontSize: 15,
                        background: location.pathname === item.to ? accent : 'transparent',
                        borderRadius: 6,
                        fontWeight: location.pathname === item.to ? '700' : '500',
                        display: 'block',
                        transition: 'all .17s',
                      }}
                    >
                      {item.label}
                    </Nav.Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <hr style={{ borderColor: accent, marginRight: 32, marginLeft: 16 }} />
      <div className="text-center mt-3">
        <Button variant="light" className="fw-bold w-75" style={{ color: themeColor }} onClick={onLogout}>
          <FiLogOut className="me-2" />
          Logout
        </Button>
      </div>
    </nav>
  );
  // Main render
  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily }}>
      {/* Header */}
      <Navbar style={{ background: themeColor, minHeight: 62 }} variant="dark" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand className="fw-bold fs-4" style={{ letterSpacing: 1 }}>
            <FiPackage className="me-2 mb-1" size={28} />
            Avanti Admin
          </Navbar.Brand>
          <div className="d-flex align-items-center ms-auto">
            <Button
              variant="link"
              className="text-light fs-4 d-lg-none"
              aria-label="Open Sidebar"
              style={{ textDecoration: "none" }}
              onClick={() => setShowSidebar(true)}
            ><FiMenu /></Button>
            <Button
              variant="outline-light"
              className="ms-2 d-none d-lg-inline-flex"
              onClick={onLogout}
              aria-label="Logout"
            ><FiLogOut className="me-2" /> Logout</Button>
          </div>
        </Container>
      </Navbar>
      {/* Sidebar + Content */}
      <Container fluid className="flex-grow-1 px-0">
        <Row className="gx-0">
          {/* Sidebar desktop */}
          <Col
            lg={2}
            className="d-none d-lg-block"
            style={{
              minHeight: "calc(100vh - 52px)",
              background: sidebarBg,
              overflowY: "auto",
              boxShadow: "0 8px 24px #ddb89222",
              paddingRight: 0,
            }}
          >
            {renderMenu()}
          </Col>
          {/* Offcanvas for mobile */}
          <Offcanvas
            show={showSidebar}
            onHide={() => setShowSidebar(false)}
            backdrop
            className="p-0"
            style={{ maxWidth: 260, background: sidebarBg }}
          >
            <Offcanvas.Header closeButton className="border-bottom" style={{ borderColor: sidebarAccent }}>
              <Offcanvas.Title>
                <FiPackage className="me-2 mb-1" /> Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ padding: 0 }}>
              {renderMenu(() => setShowSidebar(false))}
            </Offcanvas.Body>
          </Offcanvas>
          {/* Main Content */}
          <Col xs={12} lg={10} className="p-4 bg-white" style={{ background: "#fcf9f3", minHeight: "75vh" }}>
            <Outlet />
          </Col>
        </Row>
      </Container>
      {/* Footer */}
      <footer
        className="text-white text-center py-3 fs-6"
        style={{
          background: themeColor,
          letterSpacing: 1,
        }}
      >
        © {new Date().getFullYear()} Avanti Admin Panel
      </footer>
    </div>
  );
};

export default AdminDashboard;
