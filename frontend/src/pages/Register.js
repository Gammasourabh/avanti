import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function RegisterForm(e) {
  e.preventDefault();
  const formdata = { name, password, email };

  fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formdata),
  })
    .then(async (res) => {
      const data = await res.json();
     if (data.status === 201) {
  toast.success("Registration successful! Please login.");
  navigate("/login");
} else {
        toast.error(data.message || "Registration failed");
      }
    })
    .catch((error) => {
      toast.error("An error occurred: " + error.message);
    });
}

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol
          md="10"
          lg="12"
          className="order-2 order-lg-1 d-flex flex-column align-items-center"
        >
          <form onSubmit={RegisterForm}>
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
              SIGN UP
            </p>

            <div className="input-group input-group-lg d-flex flex-row align-items-center mb-4">
              <span className="input-group-text" id="inputGroup-sizing-lg">
                <MDBIcon fas icon="user me-3" size="lg" />
              </span>
              <MDBInput
                className="form-control form-control-lg"
                id="form1"
                label="Your Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group input-group-lg d-flex flex-row align-items-center mb-4">
              <span className="input-group-text" id="inputGroup-sizing-lg">
                <MDBIcon fas icon="envelope me-3" size="lg" />
              </span>
              <MDBInput
                className="form-control form-control-lg"
                label="Your Email"
                id="form2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
        

            <div className="input-group input-group-lg d-flex flex-row align-items-center mb-4">
              <span className="input-group-text" id="inputGroup-sizing-lg">
                <MDBIcon fas icon="lock me-3" size="lg" />
              </span>
              <MDBInput
                className="form-control form-control-lg"
                label="Password"
                id="form4"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <MDBBtn
              color="success "
              className="form-control mb-4"
              type="submit"
              size="lg"
            >
              Register
            </MDBBtn>

            <span>
              Already have an account? <Link to="/">Login Now</Link>
            </span>
            <br></br>
            <span>
              <Link to="/forgotPassword">Forgot Password?</Link>
            </span>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
