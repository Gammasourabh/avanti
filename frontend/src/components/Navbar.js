import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { jwtDecode } from "jwt-decode"; // ✅ Correct


const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  let username = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.name || decoded.email || "User";
    } catch (err) {
      username = "User";
    }
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleAccountClose();
    navigate("/");
    window.location.reload();
  };

  return (
    <header>
      <AppBar position="relative" sx={{ backgroundColor: "#fff", boxShadow: "none" }}>
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Left Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 7 }}>
              {[
                { label: "New Arrivals", link: "/product-list" },
                { label: "Collections", link: "/collections" },
                { label: "Best Sellers", link: "/product/:id" },
                { label: "Shop By", link: "/test" },
              ].map((item) => (
                <Link key={item.label} to={item.link} style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ color: "#000", cursor: "pointer", fontWeight: 500 }}>
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Box>

            {/* Center Logo */}
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "#754c29" }}>
                  <img src="/avantilogo.jpg" alt="Logo" style={{ height: "40px" }} />
                </Typography>
              </Link>
            </Box>

            {/* Right Side Icons */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
              {/* Other Menu Links */}
              {[
                { label: "Fabric & Care", link: "/fabric-care" },
                { label: "FAQ", link: "/faq" },
                { label: "Brand Story", link: "/product-list" },
                { label: "Our Story", link: "/our-story" },
              ].map((item) => (
                <Link key={item.label} to={item.link} style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ color: "#000", cursor: "pointer", fontWeight: 500 }}>
                    {item.label}
                  </Typography>
                </Link>
              ))}

              {/* Wishlist Icon */}
              <Link to="/wishlist">
                <IconButton
                  sx={{
                    border: "2px solid #754c29",
                    color: "#754c29",
                    borderRadius: "50%",
                    "&:hover": { backgroundColor: "#754c29", color: "#fff" },
                  }}
                >
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
              </Link>

              {/* Cart Icon */}
              <Link to="/cart">
                <IconButton
                  sx={{
                    border: "2px solid #754c29",
                    color: "#754c29",
                    borderRadius: "50%",
                    "&:hover": { backgroundColor: "#754c29", color: "#fff" },
                  }}
                >
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </IconButton>
              </Link>

              {/* Account Icon with Dropdown */}
              <IconButton
                onClick={handleAccountClick}
                sx={{
                  border: "2px solid #754c29",
                  color: "#754c29",
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "#754c29", color: "#fff" },
                }}
              >
                <AccountCircleOutlinedIcon fontSize="small" />
              </IconButton>
              <Menu anchorEl={accountMenuAnchor} open={Boolean(accountMenuAnchor)} onClose={handleAccountClose}>
                {!isLoggedIn ? (
                  <>
                    <MenuItem onClick={handleAccountClose}>
                      <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
                        Register
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleAccountClose}>
                      <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                        Login
                      </Link>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem disabled>Hello, {username}</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                )}
              </Menu>
            </Box>

            {/* Mobile Menu */}
            <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={handleMenuOpen}>
              <MoreVertIcon sx={{ color: "#754c29" }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {[
                { label: "New Arrivals", link: "/new-arrivals" },
                { label: "Collections", link: "/collections" },
                { label: "Best Sellers", link: "/best-sellers" },
                { label: "Shop By", link: "/shop-by" },
                { label: "Fabric & Care", link: "/fabric-care" },
                { label: "FAQ", link: "/faq" },
                { label: "Brand Story", link: "/productpage" },
                { label: "Our Story", link: "/our-story" },
              ].map((item) => (
                <MenuItem key={item.label} onClick={handleMenuClose}>
                  <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
                    {item.label}
                  </Link>
                </MenuItem>
              ))}

              {/* Register / Login / Logout for Mobile */}
              {!isLoggedIn ? (
                <>
                  <MenuItem onClick={handleMenuClose}>
                    <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
                      Register
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                      Login
                    </Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem disabled>Hello, {username}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              )}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Navbar;
