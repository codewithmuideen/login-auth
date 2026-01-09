// src/pages/Login.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Welcome Back</h3>
          <p className="text-muted">Sign in to your account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleEmailLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-medium">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 mb-3 fw-semibold">
            Login
          </button>
        </form>

        <div className="position-relative text-center my-4">
          <hr className="bg-secondary border-1" />
          <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
            or
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline-dark btn-lg w-100 d-flex align-items-center justify-content-center gap-3 fw-medium"
        >
          <i className="bi bi-google" style={{ fontSize: "1.25rem" }}></i>
          Sign in with Google
        </button>

        <p className="text-center mt-4 mb-0 text-muted">
          Don’t have an account? <Link to="/register" className="fw-medium text-primary">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;