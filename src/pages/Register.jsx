// src/pages/Register.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update displayName with fullName
      await updateProfile(userCredential.user, { displayName: fullName });

      // You can store phone & role in Firestore if needed

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 shadow-lg border-0" style={{ maxWidth: "550px", width: "100%" }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Create an Account</h3>
          <p className="text-muted">Join us today – it only takes a moment</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleEmailRegister}>
          {/* Row 1: Full Name and Email */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="fullName" className="form-label fw-medium">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  id="fullName"
                  className="form-control form-control-lg"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="form-label fw-medium">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 2: Password and Phone Number */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="password" className="form-label fw-medium">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="phone" className="form-label fw-medium">Phone Number</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-telephone"></i>
                </span>
                <input
                  type="tel"
                  id="phone"
                  className="form-control form-control-lg"
                  placeholder="+234 801 234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 3: Role (full width) */}
          <div className="mb-4">
            <label htmlFor="role" className="form-label fw-medium">Role</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-person-badge"></i>
              </span>
              <select
                id="role"
                className="form-select form-select-lg"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 mb-3 fw-semibold">
            Register
          </button>
        </form>

        <div className="position-relative text-center my-4">
          <hr className="bg-secondary border-1" />
          <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
            or
          </span>
        </div>

        <button
          onClick={handleGoogleRegister}
          className="btn btn-outline-dark btn-lg w-100 d-flex align-items-center justify-content-center gap-3 fw-medium"
        >
          <i className="bi bi-google" style={{ fontSize: "1.25rem" }}></i>
          Continue with Google
        </button>

        <p className="text-center mt-4 mb-0 text-muted">
          Already have an account? <Link to="/" className="fw-medium text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;