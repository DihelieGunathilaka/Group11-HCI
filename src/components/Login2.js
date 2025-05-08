import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff, LogIn, Sofa } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Login2.css"; // Import the CSS file
import logo from "../assets/logo.png";

const Login2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ auth: error.message });
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="Furniture Logo" className="logo-img" />
        </div>

        <h2 className="login-title">Welcome Back</h2>
        <h2 className="login-subtitle">Login to Design</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input text-black"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input text-black"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? <EyeOff /> : <Eye />} */}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          {errors.auth && <p className="error-text">{errors.auth}</p>}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="register-text">
          Don’t have an account?{" "}
          <a href="/register" className="register-link">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login2;
