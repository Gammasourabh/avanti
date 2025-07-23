import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    fetch(`/api/verify-email/${token}`)
      .then((res) => res.text())
      .then((msg) => setMessage(msg))
      .catch((err) => setMessage("Verification failed."));
  }, [token]);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
