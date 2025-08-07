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
  Badge,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"; // hamburger menu for mobile
import HomeIcon from "@mui/icons-material/Home"; // home icon
import FavoriteIcon from "@mui/icons-material/Favorite"; // solid heart
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // cart filled
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // account circle filled
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  let username = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.name || decoded.email || "User";
    } catch {
      username = "User";
    }
  }

  // Navigation items
  const navItems = [
    { label: "New Arrivals", link: "/product-list" },
    { label: "Collections", link: "/collections" },
    { label: "Best Sellers", link: "/best-sellers" },
    { label: "Shop By", link: "/shop-by" },
  ];

  const rightItems = [
    { label: "Fabric & Care", link: "/fabric-care" },
    { label: "FAQ", link: "/faq" },
    { label: "Brand Story", link: "/brand-story" },
    { label: "Our Story", link: "/our-story" },
  ];

  // Combined mobile menu items
  const mobileMenuItems = [...navItems, ...rightItems];

  // Handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleAccountOpen = (event) => setAccountAnchorEl(event.currentTarget);
  const handleAccountClose = () => setAccountAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleAccountClose();
    navigate("/");
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  // Replace counts with actual values from your store if needed
  const wishlistCount = 0;
  const cartCount = 0;

  return (
    <header>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ backgroundColor: "#fff" }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Left navigation (desktop) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
              {navItems.map(({ label, link }) => (
                <Link
                  key={label}
                  to={link}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{
                      color: isActive(link) ? "#754c29" : "#000",
                      fontWeight: isActive(link) ? 700 : 500,
                      cursor: "pointer",
                      "&:hover": { color: "#754c29" },
                      transition: "color 0.3s",
                    }}
                  >
                    {label}
                  </Typography>
                </Link>
              ))}
            </Box>

            {/* Logo center */}
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <Link to="/" style={{ display: "inline-block" }}>
                <img
                  src="/avantilogo.jpg"
                  alt="Logo"
                  style={{ height: 48, cursor: "pointer" }}
                  loading="lazy"
                />
              </Link>
            </Box>

            {/* Right items (desktop) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
              {rightItems.map(({ label, link }) => (
                <Link key={label} to={link} style={{ textDecoration: "none" }}>
                  <Typography
                    variant="button"
                    sx={{
                      color: isActive(link) ? "#754c29" : "#000",
                      fontWeight: isActive(link) ? 700 : 500,
                      cursor: "pointer",
                      "&:hover": { color: "#754c29" },
                      transition: "color 0.3s",
                    }}
                  >
                    {label}
                  </Typography>
                </Link>
              ))}

              {/* Wishlist */}
              <Link to="/wishlist" aria-label="Wishlist">
                <Badge
                  badgeContent={wishlistCount}
                  color="error"
                  overlap="circular"
                  invisible={wishlistCount === 0}
                >
                  <IconButton
                    sx={{
                      border: "2px solid #754c29",
                      color: "#754c29",
                      borderRadius: "50%",
                      "&:hover": { backgroundColor: "#754c29", color: "#fff" },
                    }}
                  >
                    <FavoriteIcon fontSize="small" />
                  </IconButton>
                </Badge>
              </Link>

              {/* Cart */}
              <Link to="/cart" aria-label="Cart">
                <Badge
                  badgeContent={cartCount}
                  color="error"
                  overlap="circular"
                  invisible={cartCount === 0}
                >
                  <IconButton
                    sx={{
                      border: "2px solid #754c29",
                      color: "#754c29",
                      borderRadius: "50%",
                      "&:hover": { backgroundColor: "#754c29", color: "#fff" },
                    }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </IconButton>
                </Badge>
              </Link>

              {/* Account */}
              <IconButton
                aria-controls={Boolean(accountAnchorEl) ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(accountAnchorEl) ? "true" : undefined}
                onClick={handleAccountOpen}
                sx={{
                  border: "2px solid #754c29",
                  color: "#754c29",
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "#754c29", color: "#fff" },
                }}
                aria-label="Account"
              >
                <AccountCircleIcon fontSize="small" />
              </IconButton>
              <Menu
                id="account-menu"
                anchorEl={accountAnchorEl}
                open={Boolean(accountAnchorEl)}
                onClose={handleAccountClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {!isLoggedIn ? (
                  <>
                    <MenuItem onClick={handleAccountClose} component={Link} to="/register">
                      Register
                    </MenuItem>
                    <MenuItem onClick={handleAccountClose} component={Link} to="/login">
                      Login
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

            {/* Mobile menu icon (right) */}
            <IconButton
              edge="end"
              aria-label="menu"
              aria-controls={Boolean(anchorEl) ? "mobile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              onClick={handleMenuOpen}
              sx={{ display: { xs: "flex", md: "none" }, color: "#754c29" }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
            >
              {mobileMenuItems.map(({ label, link }) => (
                <MenuItem
                  key={label}
                  onClick={() => {
                    handleMenuClose();
                    navigate(link);
                  }}
                >
                  {label}
                </MenuItem>
              ))}

              {!isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/register");
                    }}
                  >
                    Register
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/login");
                    }}
                  >
                    Login
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              )}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Navbar;
