// src/components/AboutUs.js
import "../styles/AboutUs.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Welcome from "../components/Welcome";

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            {" "}
            {/* Link to the Welcome page */}
            <img src={logo} alt="InteraVis Logo" className="logo-image" />
          </Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          {/* <li>
            <Link to="/catalog">Product Catalog</Link>
          </li> */}
          <li className="navbar-links-1">
            <Link to="/login" className="nav-button">
              Get Started
            </Link>
          </li>
        </ul>
      </nav>
      <div className="aboutus-content">
        <h1 className="aboutus-title">About InteraVis</h1>
        <p>...</p>
        <p className="aboutus-subtitle">
          Where Interaction Meets Visualisation
        </p>
        <p className="aboutus-text">
          InteraVis is built with a passion for blending intuitive interaction
          and compelling visual design. Our platform offers a dynamic user
          experience that transforms complex data and interfaces into beautiful,
          usable tools.
        </p>
        <p>...</p>
        <p>...</p>
        <p className="aboutus-text">
          Whether you're a developer, designer, or just someone who loves smooth
          digital experiences, InteraVis is here to make it happen — simply,
          elegantly, and interactively.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
