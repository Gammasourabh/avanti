import React, { useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginForm = async (e) => {
  e.preventDefault();

  const loginData = { email, password };

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (res.ok && data.status === 200) {
      localStorage.setItem("token", data.token);
      toast.success("Login successful");

      const isAdmin = data.userData.email === "admin@gmail.com" || data.userData.name.toLowerCase() === "admin";

      if (isAdmin) {
        navigate("/admindashboard");
      } else {
        navigate("/");
      }
    } else {
      toast.error(data.message || "Invalid credentials");
    }
  } catch (error) {
    toast.error("An error occurred: " + error.message);
  }
};



  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol
          md="10"
          lg="12"
          className="order-2 order-lg-1 d-flex flex-column align-items-center"
        >
          <form onSubmit={LoginForm}>
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
              LOGIN
            </p>

            <div className="input-group input-group-lg mb-4">
              <span className="input-group-text">
                <MDBIcon fas icon="envelope me-3" size="lg" />
              </span>
              <MDBInput
                label="Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group input-group-lg mb-4">
              <span className="input-group-text">
                <MDBIcon fas icon="lock me-3" size="lg" />
              </span>
              <MDBInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <MDBBtn color="success" className="form-control mb-4" type="submit" size="lg">
              Login
            </MDBBtn>

            <span>
              Don't have an account? <Link to="/register">Register Now</Link>
            </span>
            <br />
            <span>
              <Link to="/forgotPassword">Forgot Password?</Link>
            </span>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
